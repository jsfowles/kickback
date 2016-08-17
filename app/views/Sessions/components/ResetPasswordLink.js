'use strict';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ResetPasswordLink = () => (
  <TouchableOpacity style={ styles.container }>
    <Text style={ styles.text }>Forgot your Password?</Text>
  </TouchableOpacity>
);

let styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    textAlign: 'center',
  },

  text: {
    color: '#45baef',
    paddingVertical: 30,
    textAlign: 'center',
    fontSize: 17,
  },
});

export default ResetPasswordLink;
