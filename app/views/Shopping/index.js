'use strict'
import React from 'react'
import { Navigator } from 'react-native'
import { connect } from 'react-redux'

import Container from '../shared/Container'
import Header from './components/Header'
import FeaturedProducts from '../FeaturedProducts'
import Search from '../Search'
import SearchOverlay from '../Search/components/SearchOverlay'
import { setNavigator } from '../../actions'

class Shopping extends React.Component {
  renderScene = (route, navigator) => {
    let scene = {
      0: <FeaturedProducts />,
      1: <Search />,
    }

    return React.cloneElement(
      scene[route.index],
      { navigator, route, ...this.props, },
      <SearchOverlay />
    )
  }

  render() {
    return (
      <Container header={ () => <Header /> } >
        <Navigator
          initialRoute={{ name: 'Featured Products', index: 0 }}
          renderScene={ this.renderScene }
          onWillFocus={ (route) => console.log(route) }
          onDidFocus={ (route) => console.log(route) }
        />
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({})
const mapActionsToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapActionsToProps)(Shopping)
