'use strict';

import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import ItemWrapper from './HeaderItemWrapper';

class Header extends React.Component {
  static defaultProps = {
    headerColors: [ 'transparent' ],
  };

  render() {
    const {
      rightItem,
      title,
      leftItem,
      headerColors,
      headerStyles,
    } = this.props;

    return (
      <LinearGradient
        colors={ headerColors }
        style={[ styles.header, headerStyles ]}
      >
        <View style={ styles.leftItem }>
          <ItemWrapper item={ leftItem } />
        </View>

        <View style={ styles.centerItem }>
          <Text style={ styles.titleText }>{ title }</Text>
        </View>

        <View style={ styles.rightItem }>
          <ItemWrapper item={ rightItem } />
        </View>
      </LinearGradient>
    );
  }
}

Header.propTypes = {
  leftItem: React.PropTypes.shape({}),
  rightItem: React.PropTypes.shape({}),
  title: React.PropTypes.string,
  headerColors: React.PropTypes.array,
  headerStyles: React.PropTypes.object,
};

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
    alignItems: 'center',
  },

  rightItem: {
    flex: 1,
    alignItems: 'flex-end',
  },

  leftItem: {
    flex: 1,
    alignItems: 'flex-start',
  },

  titleText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Header;
