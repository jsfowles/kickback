'used strict'

import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'

import Products from '../Products'
import FeaturedCarousel from './components/FeaturedSearchesCarousel'
import {
  loadMoreProductFeed,
  setHasScrolled,
  scrollToTop,
} from '../../actions'
import Container from '../shared/Container'

class FeaturedProducts extends React.Component {
  componentWillReceiveProps(nextProps) {
    let { navigator, fetchingProducts } = this.props
    if (nextProps.fetchingProducts && !fetchingProducts && navigator.state.presentedIndex === 0) {
      this.pushNewSearchResults()
    }
  }

  componentWillMount() {
    if (this.props.searching) {
      this.pushNewSearchResults()
    }
  }

  pushNewSearchResults() {
    this.props.navigator.push({ name: 'Search Results', index: 1, searchText: this.props.searchText })
  }

  loadMoreProducts = () => {
    if (!this.props.productFeed.nextPageUrl) { return }
    this.props.loadMoreProducts()
  }

  render() {
    let { productFeed, currentTab, searchOverlay, route } = this.props
    if (currentTab !== 'SHOPPING_TAB') return null

    return (
      <View style={{ flex: 1 }}>
        <Container
          headerColors={[ '#45baef', '#34Bcd5' ]}
          hasScrolled={ this.props.hasScrolled }
          setHasScrolled={ this.props.setHasScrolled }
        >
          <Products
            products={ productFeed.products }
            title='FEATURED PRODUCTS'
            cardSize='large'
            loadMoreProducts={ this.loadMoreProducts }
            hasScrolled={ this.props.hasScrolled }
            scrollToTop={ this.props.scrollToTop }
            emptyListText='Featured products coming soon!'
            header={ <FeaturedCarousel /> }
          />
        </Container>

        { searchOverlay && route === 'productFeed' && this.props.children }
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  productFeed: state.productFeed,
  currentTab: state.navigation.tab,
  route: state.navigation.route,
  searchOverlay: state.search.searchOverlay,
  searching: state.search.searching,
  searchText: state.search.searchText,
  fetchingProducts: state.search.fetchingProducts,
  hasScrolled: state.productFeed.hasScrolled,
})

const mapActionsToProps = (dispatch) => ({
  loadMoreProducts: () => dispatch(loadMoreProductFeed()),
  setHasScrolled: () => dispatch(setHasScrolled('productFeed')),
  scrollToTop: () => dispatch(scrollToTop()),
})

export default connect(mapStateToProps, mapActionsToProps)(FeaturedProducts)
