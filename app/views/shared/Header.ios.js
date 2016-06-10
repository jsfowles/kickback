'use strict'

import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import ItemWrapper from './HeaderItemWrapper'

// TODO (Riley) : write documentation
class Header extends React.Component {
  static propTypes = {
    // TODO (Riley) : Make this shape
    leftItem: React.PropTypes.shape({}),
    // TODO (Riley) : Make this shape
    rightItem: React.PropTypes.shape({}),
    title: React.PropTypes.string,
    headerColors: React.PropTypes.array.isRequired,
  }

  // TODO (Riley) : write documentation
  static defaultProps = {
    headerColors: [ 'transparent' ],
  }

  render() {
    const { leftItem, title, rightItem, headerColors, children } = this.props;

    return (
      <LinearGradient
        colors={ headerColors }
        style={[ styles.header, this.props.style ]}
      >
        <View style={ styles.centerItem }>{ children }</View>

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
