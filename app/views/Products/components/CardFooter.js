'use strict'
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  ActionSheetIOS,
} from 'react-native'

import { numberToCurrency } from '../../../utils/number'
import commissions from '../../../utils/commissions'

const CardFooter = ({ price, merchant, recommendProduct }) => {
  let kickback = 0
  kickback = (commissions[merchant] * price).toFixed(2)

  return (
    <View style={ styles.container }>
      <View style={ styles.kickbackText }>
        <Text style={ styles.label }>Your Kickback</Text>
        <Text style={ styles.labelText }>{ numberToCurrency(kickback) }</Text>
      </View>

      <TouchableHighlight
        underlayColor='#fff'
        activeOpacity={ 0.25 }
        onPress={ recommendProduct }
      >
        <View style={ styles.shareBtn }>
          <Text style={ styles.btnText }>Recommend</Text>
          <Image source={ require('image!share') } style={ styles.share } />
        </View>
      </TouchableHighlight>
    </View>
  )
}

CardFooter.propTypes = {
  price: React.PropTypes.number.isRequired,
  merchant: React.PropTypes.string.isRequired,
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

  share: {
    width: 20,
    height: 20,
    marginLeft: 5,
    marginTop: 5,
  },

  btnText: {
    color: '#45baef',
    fontSize: 17,
    marginTop: 5,
  },

  shareBtn: {
    flex: 1,
    flexDirection: 'row',
  },
})

export default CardFooter
