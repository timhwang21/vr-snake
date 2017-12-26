import React from 'react';
import { number } from 'prop-types';
import { AppRegistry, asset, Pano, Scene, View } from 'react-vr';

import position from './src/propTypes/position';
import {
  DIRECTIONS,
  KEY_TO_DIRECTION,
  KEY_TO_DIRECTION_REVERSE,
  START_POS,
  OBJECTS,
} from './src/constants';

import createInitialPositionMap from './src/utils/createInitialPositionMap';
import createObjectAndSetPosition from './src/utils/createObjectAndSetPosition';
import createSnake from './src/utils/createSnake';
import moveSnake from './src/utils/moveSnake';
import rescale from './src/utils/rescale';
import { hasCollision, collidedWithObstacle } from './src/utils/collision';

import LightArray from './src/components/LightArray';
import Segment from './src/components/Segment';
import Segments from './src/components/Segments';

export default class vr_test extends React.Component {
  static propTypes = {
    initialSnakeLength: number,
    initialDirection: position,
    gameSpeed: number,
  };

  static defaultProps = {
    initialSnakeLength: 8,
    initialDirection: DIRECTIONS.up,
    gameSpeed: 100,
  };

  constructor() {
    super();

    this.tick = this.tick.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentWillMount() {
    this.initialize();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  initialize() {
    const { initialSnakeLength, initialDirection, gameSpeed } = this.props;

    this.interval = setInterval(this.tick, gameSpeed);

    const snake = createSnake(initialSnakeLength);

    this.positionMap = createInitialPositionMap(snake);

    const apple = createObjectAndSetPosition(this.positionMap, OBJECTS.apple);

    this.setState({
      direction: initialDirection,
      snake,
      apple,
      paused: false,
    });
  }

  tick() {
    const { apple, snake, direction, paused } = this.state;

    if (paused) {
      return;
    }

    const newSnake = moveSnake(snake, direction);
    let newApple = apple;

    const last = String(snake[0]);
    const head = String(newSnake[newSnake.length - 1]);

    if (hasCollision(this.positionMap, head)) {
      if (collidedWithObstacle(this.positionMap, head)) {
        return this.endGame();
      }

      // Add back last segment
      newSnake.splice(0, 0, snake[0]);

      newApple = createObjectAndSetPosition(this.positionMap, OBJECTS.apple);
      // set state apple
    } else {
      // no collision; update position map

      this.positionMap.delete(last);
    }

    this.positionMap.set(head, OBJECTS.segment);

    this.setState({
      apple: newApple,
      snake: newSnake,
    });
  }

  handleInput(e) {
    const event = e.nativeEvent.inputEvent;

    if (event.eventType === 'keydown') {
      this.handleKeyPress(event.code);
    }
  }

  handleKeyPress(keycode) {
    const { direction, paused } = this.state;

    if (keycode === 'Space') {
      this.setState({ paused: !paused });
      return;
    }

    const newDirection = KEY_TO_DIRECTION[keycode];

    if (!newDirection || KEY_TO_DIRECTION_REVERSE[keycode] === direction) {
      return;
    }

    this.setState({
      direction: newDirection,
      paused: false,
    });
  }

  endGame() {
    clearInterval(this.interval);
    this.initialize();
  }

  render() {
    const { apple, snake, paused } = this.state;

    return (
      <Scene
        onInput={this.handleInput}
        style={{
          transform: [{ translate: rescale(START_POS) }],
        }}
      >
        <Pano source={asset('chess-world.jpg')} />
        <View>
          <LightArray hidden={paused} />
          <Segments segments={snake} />
          <Segment position={apple} />
        </View>
      </Scene>
    );
  }
}

AppRegistry.registerComponent('vr_test', () => vr_test);
