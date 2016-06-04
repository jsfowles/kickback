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
import { connect } from 'react-redux'

import Shimmer from 'react-native-shimmer'

import { numberToCurrency } from '../../../utils/number'
// TODO (Riley) : Move this to the API
import commissions from '../../../utils/commissions'

const CardFooter = ({ price, merchant, recommendProduct, creatingRecommendation }) => {
  let kickback = 0
  kickback = (commissions[merchant] * price).toFixed(2)

  let buttonTextStyles = creatingRecommendation ? [ styles.btnText, { color: '#d4d9da' }] : styles.btnText
  let shareStyles = creatingRecommendation ? [ styles.share, { tintColor: '#d4d9da' }] : styles.share

  return (
    <View style={ styles.container }>
      <View style={ styles.kickbackText }>
        <Text style={ styles.label }>Your Kickback</Text>
        <Text style={ styles.labelText }>{ numberToCurrency(kickback) }</Text>
      </View>

      <TouchableHighlight
        underlayColor='#fff'
        activeOpacity={ creatingRecommendation ? 1 : 0.25 }
        onPress={ recommendProduct }
      >
        <View style={ styles.shareBtn }>
          <Shimmer
            opacity={ 1 }
            animationgOpacity={ 0.25 }
            animating={ creatingRecommendation }
            speed={ 115 }
          >
            <Text style={ buttonTextStyles }>Recommend</Text>
          </Shimmer>

          <Image source={ require('image!share') } style={ shareStyles } />
        </View>
      </TouchableHighlight>
    </View>
  )
}

CardFooter.propTypes = {
  price: React.PropTypes.number.isRequired,
  merchant: React.PropTypes.string.isRequired,
  recommendProduct: React.PropTypes.func.isRequired,
  creatingRecommendation: React.PropTypes.bool.isRequired,
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
    marginLeft: 7.5,
    marginTop: 5,
  },

  btnText: {
    color: '#45baef',
    fontSize: 17,
    position: 'relative',
    lineHeight: 26,
  },

  shareBtn: {
    flex: 1,
    flexDirection: 'row',
  },
})

const mapStateToProps = (state) => ({
  creatingRecommendation: state.product.creatingRecommendation,
})

const mapActionsToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapActionsToProps)(CardFooter)
