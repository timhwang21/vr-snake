import React from 'react';
import {
  AppRegistry,
  asset,
  Box,
  Pano,
  PointLight,
  Scene,
  View,
} from 'react-vr';

import {
  BOX_SIZE,
  DIRECTIONS,
  KEY_TO_DIRECTION,
} from './src/constants';

import loop from './src/utils/loop';
import move from './src/utils/move';
import rescale from './src/utils/rescale';
import Coordinates from './src/components/Coordinates';
import hidable from './src/decorators/hidable';

const HidablePointLight = hidable(PointLight);

export default class vr_test extends React.Component {
  state = {
    direction: DIRECTIONS.up,
    coordinates: [0, 0, 0],
    paused: false,
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => {
    const { coordinates, direction, paused } = this.state;

    if (paused) {
      return;
    }

    this.setState({
      coordinates: loop(move(coordinates, direction)),
    });
  }

  handleInput = e => {
    const { paused } = this.state;
    const event = e.nativeEvent.inputEvent;


    if (event.eventType === 'keydown') {
      if (event.code === 'Space') {
        this.setState({ paused: !paused });
        return;
      }

      const newDirection = KEY_TO_DIRECTION[event.code];

      newDirection && this.setState({
        direction: newDirection,
        paused: false,
      });
    }
  }

  render() {
    const { coordinates, paused } = this.state;

    return (
      <Scene
        onInput={this.handleInput}
        style={{
          transform: [
            { translate: rescale([25, 15, 45]) }
          ],
        }}

      >
        <Pano source={asset('chess-world.jpg')}/>
        <Coordinates/>
        <View
          style={{
            transform: [
              // { translate: [BOX_SIZE * -25, BOX_SIZE * 15, -3] }
            ],
          }}
        >
          <HidablePointLight
            hidden={paused}
            style={{
              color: 'green',
              transform: [
                { translate: [10, 0, 0] }
              ],
            }}
          />
          <HidablePointLight
            hidden={paused}
            style={{
              color: 'blue',
              transform: [
                { translate: [-10, 0, 0] }
              ],
            }}
          />
          <HidablePointLight
            hidden={paused}
            style={{
              color: 'red',
              transform: [
                { translate: [0, 0, -10] }
              ],
            }}
          />
          <HidablePointLight
            hidden={paused}
            style={{
              color: 'red',
              transform: [
                { translate: [0, 0, 10] }
              ],
            }}
          />
          <HidablePointLight
            hidden={paused}
            style={{
              color: 'orange',
              transform: [
                { translate: [0, 10, 0] }
              ],
            }}
          />
          <Box
            dimWidth={BOX_SIZE}
            dimDepth={BOX_SIZE}
            dimHeight={BOX_SIZE}
            lit
            style={{
              // color: 'red',
              transform: [
                { translate: rescale(coordinates) },
              ],
            }}
          />
        </View>
      </Scene>
    );
  }
}

AppRegistry.registerComponent('vr_test', () => vr_test);
