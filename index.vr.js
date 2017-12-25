import React from 'react';
import { AppRegistry, asset, Pano, Scene, View } from 'react-vr';

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
  constructor() {
    super();

    const snake = createSnake(8);

    this.state = {
      direction: DIRECTIONS.up,
      snake,
      paused: false,
    };

    this.positionMap = createInitialPositionMap(snake);
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => {
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
      } else {
        // if collided with apple, add last back into snake and do not remove last from position set
        newSnake.splice(0, 0, last);
        this.positionMap.set(head, OBJECTS.segment.type);

        this.setState({
          snake: newSnake,
        });
      }
    } else {
      this.positionMap.set(head, OBJECTS.segment.type);
      this.positionMap.delete(last);

      this.setState({
        snake: newSnake,
      });
    }
  };

  handleInput = e => {
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
  };

  endGame() {
    clearInterval(this.interval);
    this.setState({ paused: true });
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
