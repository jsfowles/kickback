'use strict';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const BottomLink = ({ title, onPress }) => (
  <TouchableOpacity onPress= { onPress }>
    <Text style={ styles.text }>{ title }</Text>
  </TouchableOpacity>
);

BottomLink.propTypes = {
  title: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired,
};

let styles = StyleSheet.create({
  text: {
    color: '#45baef',
    paddingVertical: 30,
    textAlign: 'center',
    fontSize: 17,
  },
});

export default BottomLink;
