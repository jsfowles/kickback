'use strict'
import React from 'react'
import { Navigator } from 'react-native'
import { connect } from 'react-redux'

import Container from '../shared/Container'
import Header from './components/Header'
import FeaturedProducts from '../FeaturedProducts'
import Search from '../Search'
import SearchOverlay from '../Search/components/SearchOverlay'

class Shopping extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      navigator: null,
    }
  }

  renderScene = (route, navigator) => {
    let props = {
      navigator,
      route,
      ...this.props,
    }

    if (this.state.navigator === null) {
      this.setState({ navigator: navigator })
    }

    switch (route.index) {
      case 1:
        return <Search { ...props } />
      default:
        return <FeaturedProducts { ...props } />
    }
  }

  render() {
    let { searching } = this.props

    return (
      <Container header={ () => <Header navigator={ this.state.navigator } /> } >
        <Navigator
          initialRoute={{ name: 'Featured Products', index: 0 }}
          renderScene={ this.renderScene }
        />

        { searching && <SearchOverlay /> }
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  searching: state.navigation.searching,
})

const mapActionsToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapActionsToProps)(Shopping)
