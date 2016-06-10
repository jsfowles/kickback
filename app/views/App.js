/**
 * @flow
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
	View,
  Text,
	AppState,
  StyleSheet,
} from 'react-native'

import {
  loadProductFeed,
  loadCurrentUser,
} from '../actions'

import Navigation from './Navigation'

/**
 * App Component
 * @description: This component sets up the tabbar Since we don't care if
 *               the user is logged in on the featured products tab.
 */
class App extends Component {
  /**
   * When component mounts update the AppState
   */
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)

    this.props.loadProductFeed()
    this.props.loadCurrentUser()
  }

  /**
   * Remove AppState event listener when unmounting
   */
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  /**
   * Handle the app state change
   * @todo: when app is active sync all the things
   */
  handleAppStateChange = () => {
    if (AppState.currentState === 'active') {
      this.props.loadProductFeed()
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <Navigation />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
})

const mapStateToProps = (state) => ({
  loading: state.product.creatingRecommendation,
})

const mapActionsToProps = (dispatch) => ({
  loadProductFeed: () => dispatch(loadProductFeed()),
  loadCurrentUser: () => dispatch(loadCurrentUser()),
})

export default connect(mapStateToProps, mapActionsToProps)(App)
