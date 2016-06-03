'use strict'

import React from 'react'
import { View, Text, } from 'react-native'
import { connect } from 'react-redux'

import LargeCard from './CardLarge'
import SmallCard from './CardSmall'
import { recommendProduct } from '../../../actions'

class CardContainer extends React.Component {
  static propTypes: {
    product: React.PropTypes.object,
    cardSize: React.PropTypes.string,
  };

  render() {
    let { cardSize, product, recommendProduct } = this.props

    let props = {
      recommendProduct: () => recommendProduct(product),
      product: product,
    }

    if (cardSize === 'large') {
      return <LargeCard { ...props } />
    } else {
      return <SmallCard { ...props } />
    }
  }
}

const mapStateToProps = (state) => ({})
const mapActionsToProps = (dispatch) => ({
  recommendProduct: (product) => dispatch(recommendProduct(product)),
})

export default connect(mapStateToProps, mapActionsToProps)(CardContainer)
