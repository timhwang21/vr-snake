import React from 'react';
import { AppRegistry, asset, Pano, Scene, View } from 'react-vr';

import { DIRECTIONS, KEY_TO_DIRECTION, START_POS } from './src/constants';

import createSnake from './src/utils/createSnake';
import moveSnake from './src/utils/moveSnake';
import rescale from './src/utils/rescale';
import { hasCollision, updateCollisionSet } from './src/utils/collision';

import LightArray from './src/components/LightArray';
import Snake from './src/components/Snake';

export default class vr_test extends React.Component {
  constructor() {
    super();

    const segments = createSnake(8);

    this.state = {
      direction: DIRECTIONS.up,
      segments,
      paused: false,
    };

    this.positionSet = new Set(segments.map(String));
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => {
    const { segments, direction, paused } = this.state;

    if (paused) {
      return;
    }

    const newSnake = moveSnake(segments, direction);

    const last = String(segments[0]);
    const head = String(newSnake[newSnake.length - 1]);

    if (hasCollision(this.positionSet, head)) {
      this.endGame();
    } else {
      this.positionSet = updateCollisionSet(this.positionSet, head, last);

      this.setState({
        segments: newSnake,
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
    const { segments, paused } = this.state;

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
          <Snake segments={segments} />
        </View>
      </Scene>
    );
  }
}

AppRegistry.registerComponent('vr_test', () => vr_test);
