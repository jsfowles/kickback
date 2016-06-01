'use strict'

import React from 'react'
import { View, Text, } from 'react-native'
import { connect } from 'react-redux'

import Products from '../Products'

class Search extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.searching) {
      this.props.navigator.popToTop()
    }
  }

  render() {
    let {
      searchResults,
      searchOverlay,
      fetchingProducts,
      children ,
    } = this.props

    return (
      <View style={{ flex: 1 }}>
        { fetchingProducts && <View style={{ flex: 1, backgroundColor: '#f7f8f9', }} /> }

        { !fetchingProducts && <Products
          products={ searchResults }
          title='Search Results'
          cardSize='large'
        /> }

        { searchOverlay && this.props.children }
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  searchResults: state.search.searchResults,
  searchOverlay: state.search.searchOverlay,
  searching: state.search.searching,
  fetchingProducts: state.search.fetchingProducts,
})

const mapActionsToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapActionsToProps)(Search)
