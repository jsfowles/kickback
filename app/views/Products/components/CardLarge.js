'use strict'
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native'

import CardFooter from './CardFooter'
import Pricing from './Pricing'

const ProductCardLarge = ({
  product,
  children,
}) => (
  <View style={ styles.rowContainer }>
    <View style={ styles.itemContainer }>
      <Image style={ styles.thumb } source={{ uri: product.largeImageUrl }} />
    </View>

    <View style={ styles.itemContainer }>
      <Text style={ styles.title }>{ product.title }</Text>
      <Pricing
        salePrice={ product.salePrice }
        price={ product.price }
        onSale={ product.salePrice !== product.price }
      />
    </View>

    { children }
  </View>
)

ProductCardLarge.propTypes = {
  product: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    largeImageUrl: React.PropTypes.string.isRequired,
  }),
  children: React.PropTypes.object,
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingHorizontal: 35,
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },

  itemContainer: {
    marginBottom: 15,
    flex: 1,
    alignItems: 'center',
  },

  thumb: {
    width: 200,
    height: 200,
    marginBottom: 25,
    marginTop: 25,
  },

  title: {
    fontSize: 17,
    color: '#6D7577',
    textAlign: 'center',
  },
})

export default ProductCardLarge
