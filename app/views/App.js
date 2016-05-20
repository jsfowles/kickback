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
    if (AppState === 'active') { }
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
  container: { flex: 1 }
})

export default connect()(App)
