'use strict'

import React from 'react'
import { View, Text, } from 'react-native'
import { connect } from 'react-redux'

import Products from '../Products'
import Container from '../shared/Container'
import {
  setHasScrolled,
  scrollToTop,
  setCurrentRoute,
} from '../../actions'

class Search extends React.Component {
  componentWillMount() {
    this.props.setCurrentRoute('search')
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.searching) {
      this.props.setCurrentRoute('productFeed')
      this.props.navigator.popToTop()
    }
  }

  render() {
    let {
      searchResults,
      searchOverlay,
      fetchingProducts,
      children,
      route,
    } = this.props

    return (
      <View style={{ flex: 1 }}>
        { fetchingProducts && <View style={{ flex: 1, backgroundColor: '#f7f8f9', }} /> }

        { !fetchingProducts && <Container
          hasScrolled={ this.props.hasScrolled }
          setHasScrolled={ this.props.setHasScrolled }
          customHeader={ true }
        >
          <Products
            products={ searchResults }
            title='Search Results'
            cardSize='large'
            hasScrolled={ this.props.hasScrolled }
            scrollToTop={ this.props.scrollToTop }
            emptyListText="Shoot! No results..."
          />
        </Container> }

        { searchOverlay && route === 'search' && this.props.children }
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  searchResults: state.search.searchResults,
  searchOverlay: state.search.searchOverlay,
  route: state.navigation.route,
  searching: state.search.searching,
  fetchingProducts: state.search.fetchingProducts,
  hasScrolled: state.search.hasScrolled,
})

const mapActionsToProps = (dispatch) => ({
  setHasScrolled: () => dispatch(setHasScrolled('search')),
  scrollToTop: () => dispatch(scrollToTop()),
  setCurrentRoute: (str) => dispatch(setCurrentRoute(str)),
})

export default connect(mapStateToProps, mapActionsToProps)(Search)
