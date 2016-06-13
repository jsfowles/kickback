'use strict'

import React from 'react'
import { View, Text, } from 'react-native'
import Container from '../shared/Container'
import { connect } from 'react-redux'

import { navigateSettings } from '../../actions/settings'
import Products from '../Products'
import ParallaxContent from './components/ParallaxContent'
import { loadMoreCurrentUser } from '../../actions'

class User extends React.Component {
  loadMoreProducts = () => {
    console.log(this.props.nextPageUrl)
    if (!this.props.nextPageUrl) { return }
    this.props.loadMoreCurrentUser()
  }

  render() {
    let rightItem = {
      icon: require('image!settings'),
      onPress: () => this.props.navigateSettings(),
    }

    return (
      <Container
        style={{ paddingTop: 20 }}
        parallaxContent={ <ParallaxContent /> }
      >
        <Products
          products={ this.props.products }
          title='SHARED PRODUCTS'
          cardSize='small'
          headerHeight={ 350 }
          loadMoreProducts={ this.loadMoreProducts }
        />
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.user.sharedProducts,
  nextPageUrl: state.user.nextPageUrl,
})

const mapActionsToProps = (dispatch) => ({
  navigateSettings: () => dispatch(navigateSettings()),
  loadMoreProducts: () => dispatch(loadMoreCurrentUser()),
})

export default connect(mapStateToProps, mapActionsToProps)(User)
