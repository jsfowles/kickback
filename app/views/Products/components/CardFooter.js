'use strict'
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import Shimmer from 'react-native-shimmer'

import RecommendLink from './RecommendLink'

const CardFooter = ({
  kickback,
  recommendProduct,
  link,
}) => (
  <View style={ styles.container }>
    <View style={ styles.kickbackText }>
      <Text style={ styles.label }>Your Kickback</Text>
      <Text style={ styles.labelText }>{ kickback }</Text>
    </View>

    <RecommendLink recommendProduct={ recommendProduct } showText={ true } />
  </View>
)

CardFooter.propTypes = {
  kickback: React.PropTypes.string.isRequired,
  recommendProduct: React.PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#f7f8f9',
    borderStyle: 'solid',
  },

  kickbackText: {
    flex: 1,
    flexDirection: 'column'
  },

  label: {
    fontSize: 10,
    color: '#cad0d1',
  },

  labelText: {
    fontSize: 17,
    color: '#2fd2af',
  },
})

export default CardFooter
