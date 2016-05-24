'use strict'
import React from 'react'
import { connect } from 'react-redux'

import Container from '../shared/Container'
import Header from './components/Header'
import Search from '../Search'
import FeaturedProducts from '../FeaturedProducts'

class Shopping extends React.Component {
  render() {
    let { searching } = this.props

    return (
      <Container header={ () => <Header /> }>
        <FeaturedProducts />
        { searching && <Search /> }
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  searching: state.navigation.searching,
})

const mapActionsToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapActionsToProps)(Shopping)
