'used strict'

import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'

import Products from '../Products'
import FeaturedCarousel from './components/FeaturedSearchesCarousel'

class FeaturedProducts extends React.Component {
  componentWillReceiveProps(nextProps) {
    let { navigator, fetchingProducts } = this.props
    if (nextProps.fetchingProducts && !fetchingProducts && navigator.state.presentedIndex === 0) {
      navigator.push({ name: 'Search Results', index: 1, searchText: nextProps.searchText })
    }
  }

  render() {
    let { productFeed, currentTab, searchOverlay } = this.props
    if (currentTab !== 'SHOPPING_TAB') return null

    return (
      <View style={{ flex: 1 }}>
        <Products
          products={ productFeed.products }
          title='FEATURED PRODUCTS'
          cardSize='large'
          header={ <FeaturedCarousel /> }
        />
        { searchOverlay && this.props.children }
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  productFeed: state.productFeed,
  currentTab: state.navigation.tab,
  searchOverlay: state.search.searchOverlay,
  searchText: state.search.searchText,
  fetchingProducts: state.search.fetchingProducts,
})

const mapActionsToProps = (dispatch) => ({})

export default connect(mapStateToProps)(FeaturedProducts)
