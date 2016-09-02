'use strict';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

const SettingOption = ({ title, onPress, bordered }) => (
  <TouchableHighlight
    onPress={ onPress }
    underlayColor={ '#e8edef' }
    style={[ styles.container, bordered ? styles.bordered : {}]}
  >
    <Text style={ styles.linkText }>{ title }</Text>
  </TouchableHighlight>
);

SettingOption.propTypes = {
  title: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired,
  bordered: React.PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 10,
  },

  linkText: {
    fontSize: 16,
    color: '#1b1e1f',
  },

  bordered: {
    borderBottomWidth: 1,
    borderBottomColor: '#e8edef',
  },
});

export default SettingOption;
