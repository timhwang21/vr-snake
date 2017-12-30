import React, { PureComponent } from 'react';
import { Plane } from 'react-vr';

import { BOX_SIZE } from '../constants';
import position from '../propTypes/position';

import rescale from '../utils/rescale';

export default class Segment extends PureComponent {
  static propTypes = {
    position: position,
  };

  render() {
    const { position } = this.props;

    return (
      <Plane
        dimHeight={BOX_SIZE}
        dimWidth={BOX_SIZE}
        // dimDepth={BOX_SIZE}
        style={{
          transform: [{ translate: rescale(position) }],
        }}
        lit
      />
    );
  }
}
