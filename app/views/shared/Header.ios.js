'use strict'

import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import ItemWrapper from './HeaderItemWrapper'

class Header extends React.Component {
  render() {
    const { leftItem, title, rightItem } = this.props;

    return (
      <LinearGradient
        colors={[ '#45baef', '#34Bcd5' ]}
        style={[ styles.header, this.props.style ]}
      >
        <View style={ styles.centerItem }>
          { this.props.children }
        </View>
        { rightItem && <View style={ styles.rightItem }>
          <ItemWrapper item={ rightItem } />
        </View> }
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingHorizontal: 10,
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },

  centerItem: {
    flex: 2,
    justifyContent: 'center',
  },

  rightItem: {
  },
})

export default Header
