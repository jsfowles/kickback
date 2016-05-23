'use strict'

import React from 'react'
import { View, Text, } from 'react-native'

import LargeCard from './CardLarge'
import SmallCard from './CardSmall'

class CardContainer extends React.Component {
  static propTypes: {
    product: React.PropTypes.object,
    cardSize: React.PropTypes.string,
  };

  render() {
    let { cardSize, product } = this.props

    if (cardSize === 'large') {
      return <LargeCard product={ product } />
    } else {
      return <SmallCard product={ product } />
    }
  }
}

export default CardContainer
