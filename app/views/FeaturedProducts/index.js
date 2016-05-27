'used strict'

import React from 'react'
import { connect } from 'react-redux'

import Products from '../Products'
import FeaturedCarousel from './components/FeaturedSearchesCarousel'

class FeaturedProducts extends React.Component {
  render() {
    let { productFeed, currentTab } = this.props
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
