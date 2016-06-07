'use strict'
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

import { numberToCurrency } from '../../../utils/number'

const Pricing = ({ salePrice, price, onSale }) => (
  <View style={ styles.container }>
    { onSale && <Text style={ styles.price }>{ salePrice }</Text> }
    <Text style={ onSale ? styles.onSale : styles.price }>{ price }</Text>
  </View>
)

Pricing.propTypes = {
  salePrice: React.PropTypes.string.isRequired,
  price: React.PropTypes.string.isRequired,
  onSale: React.PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },

  price: {
    color: '#d4d9da',
    fontSize: 17,
    lineHeight: 26,
    textAlign: 'center',
  },

  onSale: {
    textDecorationLine: 'line-through',
    textDecorationColor: '#d4d9da',
    textDecorationStyle: 'solid',
    color: '#e8edef',
    fontSize: 17,
    lineHeight: 26,
    marginLeft: 5,
  },
})

export default Pricing
