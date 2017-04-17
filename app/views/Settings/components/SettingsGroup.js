'use strict';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import SettingsOption from './SettingsOption';
import HeaderText from '../../shared/HeaderText';

const SettingsGroup = ({ title, options }) => (
  <View style={ styles.container }>
    { title && <HeaderText title={ title } /> }

    <View style={ styles.optionsContainer }>
      { options.map((option, i) => <SettingsOption key={ i } { ...option } /> )}
    </View>
  </View>
);

SettingsGroup.propTypes = {
  title: React.PropTypes.string,
  options: React.PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f2f4',
    marginBottom: 25,
  },

  optionsContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e8edef',
    borderBottomWidth: 1,
    borderBottomColor: '#e8edef',
  },
});

export default SettingsGroup;
