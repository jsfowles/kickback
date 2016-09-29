'use strict';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import { numberToDollars, numberToCurrency } from '../../../utils/number';

const EarningsLink = ({
  position,
  headerHeight,
  title,
  earnings,
  icon,
  handleNavigate,
}) => (
  <TouchableOpacity
    style={[ styles.button, {
      top: headerHeight - 130,
      [position]: 40,
    }]}
    onPress={ handleNavigate }
  >
    <View style={ styles.container }>
      <Image source={ icon } style={ styles.icon } />
      <Text style={ styles.earnings }>{ numberToCurrency(numberToDollars(earnings)) }</Text>
      <Text style={ styles.title }>{ title }</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 120,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#ffffff',
    fontSize: 12,
    backgroundColor: 'transparent',
  },

  earnings: {
    fontSize: 21,
    color: '#ffffff',
    fontWeight: '500',
    backgroundColor: 'transparent',
  },

  icon: {
    height: 32,
    width: 32,
    marginBottom: 8,
    tintColor: '#0d8ea2',
  },
});

EarningsLink.propTypes = {
  position: React.PropTypes.string.isRequired,
  headerHeight: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  icon: React.PropTypes.object.isRequired,
  earnings: React.PropTypes.number.isRequired,
  handleNavigate: React.PropTypes.func.isRequired,
};

export default EarningsLink;
