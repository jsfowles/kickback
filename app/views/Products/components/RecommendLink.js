'use strict'
import React from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
} from 'react-native'
import Shimmer from 'react-native-shimmer'
import { connect } from 'react-redux'

const RecommendLink = ({
  creatingRecommendation,
  recommendProduct,
  showText,
}) => {
  let buttonTextStyles = creatingRecommendation ? [ styles.btnText, { color: '#d4d9da' }] : styles.btnText
  let shareStyles = creatingRecommendation ? [ styles.share, { tintColor: '#d4d9da' }] : styles.share

  return (
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
          { showText && <Text style={ buttonTextStyles }>Recommend</Text> }
        </Shimmer>

        <Image source={ require('image!share') } style={ shareStyles } />
      </View>
    </TouchableHighlight>
  )
}

RecommendLink.propTypes = {
  creatingRecommendation: React.PropTypes.bool.isRequired,
  showText: React.PropTypes.bool.isRequired,
  recommendProduct: React.PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  btnText: {
    color: '#45baef',
    fontSize: 17,
    position: 'relative',
    lineHeight: 26,
  },

  share: {
    width: 20,
    height: 20,
    marginLeft: 7.5,
    marginTop: 5,
  },

  shareBtn: {
    flex: 1,
    flexDirection: 'row',
  },
})

const mapStateToProps = (state) => ({
  creatingRecommendation: state.product.creatingRecommendation,
})

export default connect(mapStateToProps)(RecommendLink)
