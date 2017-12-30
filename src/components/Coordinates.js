import React, { Component } from 'react';
import { object } from 'prop-types';
import { Text, View, StyleSheet } from 'react-vr';

import fixed from '../decorators/fixed';

const styles = StyleSheet.create({
  text: {
    fontSize: 0.05,
  },
});

const parse = n => Number(n.toFixed(2)) * 100;

class Coordinates extends Component {
  static propTypes = {
    style: object,
  };

  state = {
    x: 0,
    y: 0,
  };

  handleInput = e => {
    const { viewportX, viewportY } = e.nativeEvent.inputEvent;

    this.setState({
      x: viewportX,
      y: viewportY,
    });
  };

  render() {
    const { style } = this.props;
    const { x, y } = this.state;

    return (
      <View
        style={{
          height: 0.25,
          width: 0.25,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'green',
          alignSelf: 'center',
          ...style,
        }}
        onInput={this.handleInput}
      >
        <Text style={styles.text}>{`X: ${parse(x)}`}</Text>
        <Text style={styles.text}>{`Y: ${parse(y)}`}</Text>
      </View>
    );
  }
}

export default fixed(Coordinates);
