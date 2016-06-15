'use strict'

import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated
} from 'react-native'

class BackBtn extends React.Component {
  render() {
    return (
      <Animated.View
        style={{ overflow: 'hidden', width: this.props.width }}
      >
        <TouchableOpacity
          activeOpacity={ 1 }
          onPress={ this.props.cancelSearch }
        >
          <Image
            source={ require('image!back') }
            style={ styles.backBtn }
          />
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  backBtn: {
    marginRight: 10,
    width: 14,
  }
})

export default BackBtn
