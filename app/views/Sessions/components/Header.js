'use strict';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';

import DismissKeyboard from 'dismissKeyboard';

const Header = ({ closeModal, style }) => (
  <TouchableWithoutFeedback onPress={ () => DismissKeyboard() }>
    <View style={[ styles.container, style ]}>
      <View style={ styles.logoContainer }>
        <Image source={ require('./assets/images/logo.png')} style={ styles.logo } resizeMode={ Image.resizeMode.contain } />
        <Text style={ styles.logoText }>Get paid for referring products</Text>
      </View>

      <TouchableHighlight
        underlayColor='transparent'
        style={ styles.closeBtn }
        onPress={ closeModal }
      >
        <Image source={ require('./assets/images/close.png') } />
      </TouchableHighlight>
    </View>
  </TouchableWithoutFeedback>
);

let styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  logoContainer: {
    backgroundColor: 'transparent',
  },

  logo: {
    width: 278,
    height: 44,
  },

  logoText: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    color: '#fff',
    marginTop: 10,
  },

  closeBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default Header;
