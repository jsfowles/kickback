'use strict';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

const SettingOption = ({ title, onPress, bordered }) => (
  <TouchableHighlight
    onPress={ onPress }
    underlayColor={ '#e8edef' }
    style={ styles.container }
  >
    <View style={[ styles.optionWrapper, bordered ? styles.linkBordered : {} ]}>
      <Text style={ styles.linkText }>{ title }</Text>
      <Image source={ require('image!forward') } />
    </View>
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
    paddingLeft: 13,
  },

  optionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingRight: 13,
  },

  linkText: {
    fontSize: 16,
    color: '#1b1e1f',
  },

  linkBordered: {
    borderBottomWidth: 0.5,
    borderColor: '#e8edef',
  },
});

export default SettingOption;
