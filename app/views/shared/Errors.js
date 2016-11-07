'use strict';

import React from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
} from 'react-native';

class Errors extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          { transform: [{
            translateY: this.props.position.interpolate({
              inputRange: [0,1],
              outputRange: [-36, 0],
            }),
          }]}
        ]}
      >
        <Text style={{ color: '#fff' }}>{ this.props.message }</Text>
      </Animated.View>
    );
  }
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ea2b3f',
    position: 'absolute',
  },
});

export default Errors;
