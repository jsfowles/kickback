'use strict'

import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import Header from './Header'

class Container extends React.Component {
  render() {
    let { header, children, rightItem } = this.props

    return (
      <View style={ styles.container }>
        <View>
          <Header rightItem={ rightItem }>
            { header && header() }
          </Header>
        </View>

        { children }
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
