'use strict'

import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import Header from './Header'

class Container extends React.Component {
  render() {
    return (
      <View style={ styles.container }>
        <View>
          <Header headerBtn={ this.props.headerBtn } >
            { this.props.header() }
          </Header>
        </View>
        { this.props.children }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8f9',
  },
})

export default Container
