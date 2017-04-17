'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { numberToDollars, numberToCurrency } from '../../../utils/number';

import UserModal from './UserModal';

import {
  push,
  closeModal,
} from '../../../actions';

export const PayoutInfo = ({ user, closeModal, pushRoute }) => (
  <UserModal
    description='All earnings will be deposited into your bank account the following day.'
    icon={ require('./assets/images/pending.png') }
    linkText='Deposit Settings'
    linkAction={ () => {
      closeModal();
      return pushRoute();
    } }
  >
    <View style={{ marginRight: 50 }}>
      <Text style={ styles.earningsLabel }>In Processing</Text>
      <Text style={ styles.inProcessing }>{ numberToCurrency(numberToDollars(user.totalPendingOrWaitingApproval)) }</Text>
    </View>

    <View>
      <Text style={ styles.earningsLabel }>Scheduled Deposit</Text>
      <Text style={ styles.scheduledDeposit }>{ numberToCurrency(numberToDollars(user.totalApproved)) }</Text>
    </View>
  </UserModal>
);

PayoutInfo.propTypes = {
  user: React.PropTypes.shape({}).isRequired,
  closeModal: React.PropTypes.func.isRequired,
  pushRoute: React.PropTypes.func.isRequired,
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

const mapActionsToProps = dispatch => ({
  pushRoute: () => dispatch(push({ key: 'depositSettings' }, 'profile')),
  closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapActionsToProps)(PayoutInfo);
