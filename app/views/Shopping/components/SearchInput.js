'use strict'
import React from 'react'
import {
  View,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native'

// When I hit search this is what should happen:
// 1. Start searching products
// 2. Receive Products
// 3. Push search on the nav stack

const SearchInput = ({ style, requestProducts, navigator, navigateSearch }) => (
  <View style={ style } >
    <View style={ styles.inputContainer }>
      <TextInput
        style={ styles.input }
        placeholder='Search'
        placeholderTextColor='#fff'
        selectionColor='#fff'
        autoFocus={ true }
        autoCorrect={ false }
        returnKeyType='search'
        enablesReturnKeyAutomatically={ true }
        clearButtonMode='always'
        onEndEditing={ () => {
          navigator.push({ name: 'Search Results', index: 1  })
          navigateSearch()
        }}
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
