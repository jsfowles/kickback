'use strict'

import React from 'react'
import { View, Text, } from 'react-native'
import { connect } from 'react-redux'

import LargeCard from './CardLarge'
import SmallCard from './CardSmall'
import CardFooter from './CardFooter'
import CardFooterShared from './CardFooterShared'
import { recommendProduct } from '../../../actions'

class CardContainer extends React.Component {
  static propTypes: {
    product: React.PropTypes.object,
    cardSize: React.PropTypes.string,
  };

  shouldComponentUpdate() {
    return false;
  }

  renderFooter = () => {
    const { product, recommendProduct } = this.props
    const props = {
      kickback: product.kickback,
      recommendProduct: () => recommendProduct(product),
      link: !!product.link ? product.link : null,
    }

    if (!!product.link) {
      return <CardFooterShared { ...props } />
    } else {
      return <CardFooter { ...props } />
    }
  }

  render() {
    const { cardSize, product } = this.props
    const content = cardSize === 'large' ? <LargeCard/> : <SmallCard />

    return React.cloneElement(
      content,
      { product: product },
      this.renderFooter()
    )
  }
}

const mapStateToProps = (state) => ({})
const mapActionsToProps = (dispatch) => ({
  recommendProduct: (product) => dispatch(recommendProduct(product)),
})

export default connect(mapStateToProps, mapActionsToProps)(CardContainer)
