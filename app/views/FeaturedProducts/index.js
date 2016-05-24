'used strict'

import React from 'react'
import { connect } from 'react-redux'

import Container from '../shared/Container'
import Products from '../Products'
import Header from './components/FeaturedProductsHeader'
import FeaturedCarousel from './components/FeaturedSearchesCarousel'

class FeaturedProducts extends React.Component {
  render() {
    let { productFeed, currentTab } = this.props

    if (currentTab !== 'FEATURED_TAB') return null

    return (
      <Container
        header={ () => <Header /> }
      >
        <Products
          products={ productFeed.products }
          title='FEATURED PRODUCTS'
          cardSize='large'
          header={ <FeaturedCarousel /> }
        />
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  productFeed: state.productFeed,
  currentTab: state.navigation.tab,
})

const mapActionsToProps = (dispatch) => ({})

export default connect(mapStateToProps)(FeaturedProducts)
