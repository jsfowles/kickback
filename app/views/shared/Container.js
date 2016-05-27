'use strict'

import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import Header from './Header'

class Container extends React.Component {
  render() {
    let { header, children, rightItem } = this.props

    return (
      <View style={ styles.container }>
        { children }

        <View style={ styles.header }>
          <Header rightItem={ rightItem }>
            { header && header() }
          </Header>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingTop: 65,
  },

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
})

export default Container
