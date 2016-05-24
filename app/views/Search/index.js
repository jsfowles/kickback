'use strict'

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native'

const {
  height: deviceHeight,
  width: deviceWidth,
} = Dimensions.get('window')

// TODO: Add search categories
class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(0),
    }
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      { toValue: 0.95, duration: 200 }
    ).start()
  }

  render() {
    return (
      <Animated.View style={[ styles.container, { opacity: this.state.fadeAnim }]}>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: '#fff',
    paddingTop: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Search
