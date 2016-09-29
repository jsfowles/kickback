'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { numberToDollars, numberToCurrency } from '../../../utils/number';

import UserModal from './UserModal';

export const PayoutInfo = ({ user }) => (
  <UserModal
    description='All earnings will be deposited into your bank account the following day.'
    icon={ require('image!pending') }
    linkText='Deposit Settings'
    linkAction={ () => console.log('navigate to settings#depositSettings') }
  >
    <View style={{ marginRight: 50 }}>
      <Text style={ styles.earningsLabel }>In Processing</Text>
      <Text style={ styles.inProcessing }>{ numberToCurrency(numberToDollars(user.totalWaitingApproval)) }</Text>
    </View>

    <View>
      <Text style={ styles.earningsLabel }>Scheduled Deposit</Text>
      <Text style={ styles.scheduledDeposit }>{ numberToCurrency(numberToDollars(user.totalPending)) }</Text>
    </View>
  </UserModal>
);

PayoutInfo.propTypes = {
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

export default connect(mapStateToProps, mapActionsToProps)(PayoutInfo);
