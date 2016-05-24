'use strict'
import React from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

const CancelBtn = ({ navigateSearch }) => (
  <TouchableOpacity
    style={ styles.cancelBtn }
    activeOpacity={ 1 }
    onPress={ navigateSearch }
  >
    <Text style={{ color: '#fff' }}>Cancel</Text>
  </TouchableOpacity>
)

const styles= StyleSheet.create({
  cancelBtn: {
    position: 'absolute',
    right: 0,
    transform: [{
      translateX: 55,
    }],
    top: 0,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CancelBtn
