import React from 'react';
import { Box } from 'react-vr';

import { BOX_SIZE } from '../constants';
import position from '../propTypes/position';

import rescale from '../utils/rescale';

const Segment = ({ position }) => (
  <Box
    dimHeight={BOX_SIZE}
    dimWidth={BOX_SIZE}
    dimDepth={BOX_SIZE}
    style={{
      transform: [{ translate: rescale(position) }],
    }}
    lit
  />
);

Segment.propTypes = {
  position: position,
};

Segment.displayName = 'Segment';

export default Segment;
