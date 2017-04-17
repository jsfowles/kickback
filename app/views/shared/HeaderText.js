'use strict';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const HeaderText = ({ title, style }) => (
  <Text style={[ style, styles.text ]}>{ title.toUpperCase() }</Text>
);

const styles = StyleSheet.create({
  text: {
    margin: 7,
    color: '#8c9aa0',
    fontWeight: '500',
  },
});

HeaderText.propTypes = {
  title: React.PropTypes.string.isRequired,
  style: React.PropTypes.object,
};

export default HeaderText;
