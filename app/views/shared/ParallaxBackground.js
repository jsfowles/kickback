'use strict';

import React from 'react';
import {
  StyleSheet,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class ParallaxBackground extends React.Component {
  render() {
    return (
      <Animated.View style={[ styles.container, { height: this.props.height }]}>
        <LinearGradient
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          colors={[ '#45baef', '#34D5d0' ]}
          start={[ 0.75, 0 ]}
          end={[ 0, 1 ]}
        />
      </Animated.View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },

  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 415,
  },
})

export default ParallaxBackground
