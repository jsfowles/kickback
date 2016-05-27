'used strict'

import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import Container from '../shared/Container'
import Products from '../Products'
import FeaturedCarousel from './components/FeaturedSearchesCarousel'
import SearchOverlay from '../Search/components/SearchOverlay'

class FeaturedProducts extends React.Component {
  render() {
    let { productFeed, currentTab,  searching } = this.props
    if (currentTab !== 'SHOPPING_TAB') return null

    return (
      <Products
        products={ productFeed.products }
        title='FEATURED PRODUCTS'
        cardSize='large'
        header={ <FeaturedCarousel /> }
      />
    )
  }
}

const mapStateToProps = (state) => ({
  productFeed: state.productFeed,
  currentTab: state.navigation.tab,
})

const mapActionsToProps = (dispatch) => ({})

export default connect(mapStateToProps)(FeaturedProducts)
