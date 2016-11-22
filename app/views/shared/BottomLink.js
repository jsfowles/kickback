'use strict';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const BottomLink = ({ containerStyles, title, onPress }) => (
  <TouchableOpacity onPress= { onPress } style={ containerStyles }>
    <Text style={ styles.text }>{ title }</Text>
  </TouchableOpacity>
);

BottomLink.propTypes = {
  title: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired,
  containerStyles: React.PropTypes.object.isRequired,
};

BottomLink.defaultProps = {
  containerStyles: {},
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
