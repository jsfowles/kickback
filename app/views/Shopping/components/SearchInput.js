'use strict'
import React from 'react'
import {
  View,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native'

const SearchInput = ({ style }) => (
  <View style={ style } >
    <View style={ styles.inputContainer }>
      <TextInput
        style={ styles.input }
        placeholder='Search'
        placeholderTextColor='#fff'
        selectionColor='#fff'
        autoFocus={ true }
      />
      <Image source={ require('image!search') } />
    </View>
  </View>
)

const styles = StyleSheet.create({
  input: {
    height: 30,
    position: 'absolute',
    top: 0,
    left: 32,
    fontSize: 14,
    right: 0,
    color: '#fff'
  },

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingLeft: 13,
  },
})

export default SearchInput
