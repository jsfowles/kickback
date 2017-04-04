'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { numberToDollars, numberToCurrency } from '../../../utils/number';

import UserModal from './UserModal';

export const EarningsInfo = ({ user }) => (
  <UserModal
    description='Get paid for referring products'
    icon={ require('image!earnings') }
  >
    <View>
      <Text style={ styles.earningsLabel }>Total Earned</Text>
      <Text style={ styles.inProcessing }>{ numberToCurrency(numberToDollars(user.totalEarned)) }</Text>
    </View>
  </UserModal>
);

EarningsInfo.propTypes = {
  user: React.PropTypes.shape({}).isRequired,
};

const styles = StyleSheet.create({
  earningsLabel: {
    color: '#cad0d1',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 1,
  },

  inProcessing: {
    color: '#6d7577',
    fontSize: 32,
    textAlign: 'center',
  },

  scheduledDeposit: {
    color: '#2fd2af',
    fontSize: 32,
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  user: state.user.user,
});

const mapActionsToProps = _ => ({});

export default connect(mapStateToProps, mapActionsToProps)(EarningsInfo);
