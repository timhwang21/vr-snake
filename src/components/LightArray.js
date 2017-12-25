import React from 'react';
import { PointLight, View } from 'react-vr';

import hidable from '../decorators/hidable';

const LightArray = () => (
  <View>
    <PointLight
      style={{
        color: 'green',
        transform: [{ translate: [10, 0, 0] }],
      }}
    />
    <PointLight
      style={{
        color: 'blue',
        transform: [{ translate: [-10, 0, 0] }],
      }}
    />
    <PointLight
      style={{
        color: 'red',
        transform: [{ translate: [0, 0, -10] }],
      }}
    />
    <PointLight
      style={{
        color: 'red',
        transform: [{ translate: [0, 0, 10] }],
      }}
    />
    <PointLight
      style={{
        color: 'orange',
        transform: [{ translate: [0, 10, 0] }],
      }}
    />
  </View>
);

export default hidable(LightArray);
