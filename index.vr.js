import React from 'react';
import { number } from 'prop-types';
import { AppRegistry, asset, Pano, Scene, View } from 'react-vr';

import position from './src/propTypes/position';
import {
  DIRECTIONS,
  KEY_TO_DIRECTION,
  START_POS,
  OBJECTS,
} from './src/constants';

import createInitialPositionMap from './src/utils/createInitialPositionMap';
import createSnake from './src/utils/createSnake';
import moveSnake from './src/utils/moveSnake';
import rescale from './src/utils/rescale';
import { hasCollision, collidedWithObstacle } from './src/utils/collision';

import LightArray from './src/components/LightArray';
import Snake from './src/components/Snake';

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

    this.setState({
      direction: initialDirection,
      snake,
      paused: false,
    });
  }

  tick() {
    const { snake, direction, paused } = this.state;

    if (paused) {
      return;
    }

    const newSnake = moveSnake(snake, direction);

    const last = String(snake[0]);
    const head = String(newSnake[newSnake.length - 1]);

    if (hasCollision(this.positionMap, head)) {
      if (collidedWithObstacle(this.positionMap, head)) {
        return this.endGame();
      }

      // Add back last segment
      newSnake.splice(0, 0, last);
      this.positionMap.set(head, OBJECTS.segment);

      this.setState({
        snake: newSnake,
      });
    } else {
      this.positionMap.set(head, OBJECTS.segment);
      this.positionMap.delete(last);

      this.setState({
        snake: newSnake,
      });
    }
  }

  handleInput(e) {
    const { paused } = this.state;
    const event = e.nativeEvent.inputEvent;

    if (event.eventType === 'keydown') {
      if (event.code === 'Space') {
        this.setState({ paused: !paused });
        return;
      }

      const newDirection = KEY_TO_DIRECTION[event.code];

      newDirection &&
        this.setState({
          direction: newDirection,
          paused: false,
        });
    }
  }

  endGame() {
    clearInterval(this.interval);
    this.initialize();
    // this.setState({ paused: true });
  }

  render() {
    const { snake, paused } = this.state;

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
          <Snake segments={snake} />
        </View>
      </Scene>
    );
  }
}

AppRegistry.registerComponent('vr_test', () => vr_test);
