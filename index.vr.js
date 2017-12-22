import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
} from 'react-vr';

import clickable from './src/decorators/clickable';
import hoverable from './src/decorators/hoverable';
import fixed from './src/decorators/fixed';

const MyText = clickable(hoverable(Text));
const FixedView = fixed(View);

export default class vr_test extends React.Component {
  state = {
    counter: -3,
  };

  handleClick = () => this.setState(state => ({ counter: state.counter + 1 }));
  handleLongClick = () => this.setState(state => ({ counter: state.counter - 1 }));

  render() {
    const { counter } = this.state;

    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <FixedView
          style={{
            transform: [
              { translate: [0, 0, -2] },
            ]
          }}
        >
          <Text>+</Text>
        </FixedView>
        <View
          style={{
            layoutOrigin: [.5, .5],
          }}
        >
          <View
            style={{
              alignItems: 'center',
              transform: [
                { translate: [0, 0, counter] }
              ]
            }}
          >
            <MyText
              onClick={this.handleClick}
              onLongClick={this.handleLongClick}
              style={{
                backgroundColor: '#777879',
                fontSize: 0.8,
                fontWeight: '400',
                paddingLeft: 0.2,
                paddingRight: 0.2,
                textAlign: 'center',
                textAlignVertical: 'center',
              }}>
              Click to move
            </MyText>
          </View>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('vr_test', () => vr_test);
