'use strict'

import React from 'react'
import { View, Text, } from 'react-native'
import Container from '../shared/Container'
import { connect } from 'react-redux'

import { navigateSettings } from '../../actions/settings'
import Products from '../Products'
import ParallaxContent from './components/ParallaxContent'
import {
  loadMoreCurrentUser,
  setHasScrolled,
  scrollToTop,
  setCurrentRoute,
} from '../../actions'

class User extends React.Component {
  loadMoreProducts = () => {
    if (!this.props.nextPageUrl) { return }
    this.props.loadMoreProducts()
  }

  render() {
    let rightItem = {
      icon: require('image!settings'),
      onPress: () => this.props.navigateSettings(),
    }

    return (
      <Container
        style={{ paddingTop: 20 }}
        hasScrolled={ this.props.hasScrolled }
        setHasScrolled={ this.props.setHasScrolled }
        parallaxContent={ <ParallaxContent /> }
      >
        <Products
          products={ this.props.products }
          title='SHARED PRODUCTS'
          cardSize='small'
          headerHeight={ 350 }
          loadMoreProducts={ this.loadMoreProducts }
          hasScrolled={ this.props.hasScrolled }
          scrollToTop={ this.props.scrollToTop }
        />
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.user.sharedProducts,
  nextPageUrl: state.user.nextPageUrl,
  hasScrolled: state.user.hasScrolled,
  tab: state.navigation.tab,
})

const mapActionsToProps = (dispatch) => ({
  navigateSettings: () => dispatch(navigateSettings()),
  loadMoreProducts: () => dispatch(loadMoreCurrentUser()),
  setHasScrolled: () => dispatch(setHasScrolled('user')),
  scrollToTop: () => dispatch(scrollToTop()),
  setCurrentRoute: () => dispatch(setCurrentRoute('user')),
})

export default connect(mapStateToProps, mapActionsToProps)(User)
