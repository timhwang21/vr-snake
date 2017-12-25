import React from 'react';
import { AppRegistry, asset, Pano, Scene, View } from 'react-vr';

import { DIRECTIONS, KEY_TO_DIRECTION, START_POS } from './src/constants';

import createSnake from './src/utils/createSnake';
import moveSnake from './src/utils/moveSnake';
import rescale from './src/utils/rescale';

import LightArray from './src/components/LightArray';
import Snake from './src/components/Snake';

export default class vr_test extends React.Component {
  state = {
    direction: DIRECTIONS.up,
    segments: createSnake(8),
    paused: false,
  };

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

    this.setState({
      segments: moveSnake(segments, direction),
    });
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
