'use strict';

import React from 'react';
import {
  StyleSheet,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class ParallaxBackground extends React.Component {
  static propTypes = {
    children: React.PropTypes.object,
    minHeight: React.PropTypes.number,
    maxHeight: React.PropTypes.number,
    offset: React.PropTypes.object,
  };

  render() {
    const { minHeight, maxHeight, offset } = this.props;
    const buffer = 20;
    const height = offset.interpolate({
      inputRange: [ 0, maxHeight - minHeight ],
      outputRange: [ maxHeight + buffer, minHeight + buffer ],
      extrapolateRight: 'clamp',
    });

    return (
      <Animated.View style={[ styles.container, { height }]}>
        <LinearGradient
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          colors={[ '#28b5f5', '#34D5d0' ]}
          start={{ x: 0.75, y:0 }}
          end={{ x:0, y:1 }}
        >
          { this.props.children }
        </LinearGradient>
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
});

export default ParallaxBackground;
