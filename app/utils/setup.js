/**
 * @flow
 */
'use strict'

import React, { Component } from 'react'

import {
  StatusBar,
  View,
} from 'react-native'

import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'

function setup(): React.Component {
  StatusBar.setBarStyle('light-content')
  console.disableYellowBox = true

  class Root extends Component {
    constructor() {
      super()
      this.state = {
        isLoading: false,
        store: configureStore(() => this.setState({ isLoading: false })),
      }
    }

    render() {
      if (this.state.isLoading) { return null }

      return (
        <Provider store={ this.state.store }>
          <View />
        </Provider>
      )
    }
  }

  return Root
}

global.LOG = (...args) => {
	console.log('/------------------------------\\');
	console.log(...args);
	console.log('\\------------------------------/');
	return args[args.length - 1];
}

export default setup
