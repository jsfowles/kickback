'use strict'

import React from 'react'
import { View, Text, } from 'react-native'
import { connect } from 'react-redux'

import Products from '../Products'

class Search extends React.Component {
  render() {
    let { searchResults } = this.props

    return (
      <Products
        products={ searchResults }
        title='Search Results'
        cardSize='large'
      />
    )
  }
}

const mapStateToProps = (state) => ({
  searchResults: state.search.searchResults
})

const mapActionsToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapActionsToProps)(Search)
