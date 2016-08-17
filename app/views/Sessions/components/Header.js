'use strict';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';

const Header = ({ closeModal }) => (
  <View style={ styles.container }>
    <Image source={ require('image!loginBg') } style={ styles.bgImage } />

    <View style={ styles.logoContainer }>
      <Image source={ require('image!logo') } style={ styles.logo } resizeMode={ Image.resizeMode.contain } />
      <Text style={ styles.logoText }>Get paid for referring products</Text>
    </View>

    <TouchableHighlight
      underlayColor='transparent'
      style={ styles.closeBtn }
      onPress={ closeModal }
    >
      <Image source={ require('image!close') } />
    </TouchableHighlight>
  </View>
);

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#ececec',
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoContainer: {
    backgroundColor: 'transparent',
  },

  logo: {
    width: 278,
    height: 44,
  },

  logoText: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    color: '#fff',
    marginTop: 10,
  },

  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
  },

  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default Header;
