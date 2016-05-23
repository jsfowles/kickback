'use strict'
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native'

const ProductCardLarge = ({ product }) => (
  <View style={ styles.rowContainer }>
		<Image style={ styles.thumb } source={{ uri: product.large_image_url }} />

    <View style={ styles.textContainer }>
      <Text style={ styles.title }>{ product.title }</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'hidden'
  },

  thumb: {
    width: 200,
    height: 200,
    marginBottom: 25,
    marginTop: 25
  },

	textContainer: {
    marginBottom: 15,
    flex: 1,
    position: 'relative',
  },

  title: {
    fontSize: 17,
    width: 250,
    textAlign: 'center',
    color: '#6D7577'
  },
})

export default ProductCardLarge
