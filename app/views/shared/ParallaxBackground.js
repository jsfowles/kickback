'use strict'

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

class ParallaxBackground extends React.Component {
  render() {
    const { minHeight, maxHeight, offset } = this.props
    const buffer = 10
    const height = offset.interpolate({
      inputRange: [0, maxHeight - minHeight],
      outputRange: [maxHeight + buffer, minHeight + buffer],
      extrapolateRight: 'clamp',
    })

    return (
      <Animated.View
        style={[ styles.container, { height }]}
      >
        { this.renderBackground() }
        { this.renderContent() }
      </Animated.View>
    )
  }

  renderBackground() {
    const { minHeight, maxHeight, offset } = this.props
    const length = maxHeight - minHeight
    return (
      <LinearGradient
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        colors={[ '#45baef', '#34D5d0' ]}
        start={[0.75, 0]}
        end={[0, 1]}
      />
    )
  }


  renderContent() {
    const { minHeight, maxHeight, offset } = this.props
    const length = maxHeight - minHeight

    const translateY = offset.interpolate({
      inputRange: [-length, 0, length],
      outputRange: [10, -32, -(length / 2) - 32],
      extrapolate: 'clamp',
    })

    const opacity = offset.interpolate({
      inputRange: [-100, 0, length - 105],
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    })

    const transforms = { opacity, transform: [{translateY}] }

    return (
      <Animated.View style={[ styles.contentContainer, transforms ]}>
        { this.props.parallaxContent }
      </Animated.View>
    )
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
