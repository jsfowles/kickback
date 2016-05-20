'use strict'

import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

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
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
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

  headerBtn: {
    flex: 1,
    backgroundColor: 'rgba(11, 87, 119, 0.15)',
    height: 30,
    marginHorizontal: 10,
    borderRadius: 6,
    justifyContent: 'center',
  },
})

export default Header
