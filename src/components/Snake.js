import React, { Component } from 'react';
import { arrayOf } from 'prop-types';
import { View } from 'react-vr';

import position from '../propTypes/position';
import Segment from './Segment';

export default class Snake extends Component {
  static propTypes = {
    segments: arrayOf(position),
  };

  render() {
    const { segments } = this.props;

    return (
      <View>
        {segments.map(position => (
          <Segment id={position.join('')} position={position} />
        ))}
      </View>
    );
  }
}
