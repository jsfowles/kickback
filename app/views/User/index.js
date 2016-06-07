'use strict'

import React from 'react'
import { View, Text, } from 'react-native'
import Container from '../shared/Container'
import { connect } from 'react-redux'

import { navigateSettings } from '../../actions/settings'
import Products from '../Products'

class User extends React.Component {
  render() {
    let rightItem = {
      icon: require('image!settings'),
      onPress: () => this.props.navigateSettings(),
    }

    return (
      <Container
        rightItem={ rightItem }
      >
        <Products
          products={ this.props.products }
          title='SHARED PRODUCTS'
          cardSize='small'
        />
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.user.sharedProducts,
})

const mapActionsToProps = (dispatch) => ({
  navigateSettings: () => dispatch(navigateSettings()),
})

export default connect(mapStateToProps, mapActionsToProps)(User)
