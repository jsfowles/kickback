'use strict'
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

import RecommendLink from './RecommendLink'

const CardFooterShared = ({
  kickback,
  recommendProduct,
  link,
}) => (
  <View style={ styles.container }>
    <View style={ styles.textContainer }>
      <View style={ styles.kickbackText }>
        <Text style={[ styles.label, { width: 75 }]}>You've Made</Text>
        <Text style={ styles.labelText }>{ link.commission }</Text>
      </View>

      <View style={ styles.kickbackText }>
        <Text style={ styles.label }>Clicks</Text>
        <Text style={ styles.labelText }>{ link.clicks }</Text>
      </View>

      <View style={ styles.kickbackText }>
        <Text style={ styles.label }>Sold</Text>
        <Text style={ styles.labelText }>{ link.salesCount }</Text>
      </View>
    </View>

    <View style={ styles.btnContainer }>
      <RecommendLink recommendProduct={ recommendProduct } showText={ false } />
    </View>
  </View>
)

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
    flexDirection: 'column',
    marginHorizontal: 12,
  },

  label: {
    fontSize: 10,
    color: '#cad0d1',
  },

  labelText: {
    fontSize: 17,
    color: '#2fd2af',
  },

  textContainer: {
    flex: 9,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  btnContainer: {},
})

export default CardFooterShared
