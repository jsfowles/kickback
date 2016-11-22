import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Switch,
} from 'react-native';

import Container from '../../shared/Container';
import { updateNotificationSettings } from '../../../actions/';

class PushNotifications extends React.Component {
  static propTypes = {
    handleNavigate: React.PropTypes.func,
    notifications: React.PropTypes.shape({
      enabled: React.PropTypes.bool.isRequired,
      payableStatus: React.PropTypes.bool.isRequired,
      payableWorkCreated: React.PropTypes.bool.isRequired,
      payableWorkPaid: React.PropTypes.bool.isRequired,
      transactionCreated: React.PropTypes.bool.isRequired,
    }).isRequired,
  };

  render() {
    let { handleNavigate, updateNotificationSettings } = this.props;
    let {
      enabled,
      payableStatus,
      payableWorkCreated,
      payableWorkPaid,
      transactionCreated,
    } = this.props.notifications;

    return (
      <Container
        style={{ flex: 1, paddingBottom: 50 }}
        title='Notification Settings'
        headerColors={[ '#45baef', '#34bcd5' ]}
        leftItem={{
          icon: require('image!back'),
          onPress: () => handleNavigate({ type: 'pop' }),
        }}
      >
        <View style={[ styles.inputContainer, { marginTop: 30 }]}>
          <View style={ styles.switchContainer }>
            <Text style={ styles.label }>Allow Notifications</Text>
            <Switch value={ enabled } onValueChange={ v => updateNotificationSettings(v, 'enabled') } />
          </View>
        </View>

        <View style={[ styles.inputContainer, { marginTop: 30 }]}>
          <View style={[ styles.switchContainer, styles.borderBottom ]}>
            <Text style={ styles.label }>Purchase Made</Text>
            <Switch value={ transactionCreated } onValueChange={ v => updateNotificationSettings(v, 'transactionCreated') } />
          </View>

          <View style={[ styles.switchContainer, styles.borderBottom ]}>
            <Text style={ styles.label }>Payment in Processing</Text>
            <Switch value={ payableWorkCreated } onValueChange={ v => updateNotificationSettings(v, 'payableWorkCreated') } />
          </View>

          <View style={[ styles.switchContainer, styles.borderBottom ]}>
            <Text style={ styles.label }>Payment Deposited</Text>
            <Switch value={ payableWorkPaid } onValueChange={ v => updateNotificationSettings(v, 'payableWorkPaid') } />
          </View>

          <View style={ styles.switchContainer }>
            <Text style={ styles.label }>Payable Status</Text>
            <Switch value={ payableStatus } onValueChange={ v => updateNotificationSettings(v, 'payableStatus') } />
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#adb2bb',
    borderBottomWidth: 1,
    borderBottomColor: '#adb2bb',
    paddingLeft: 30,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 30,
  },

  borderBottom: {
    borderBottomColor: '#CAD0D1',
    borderBottomWidth: 1,
  },

  label: {
    lineHeight: 50,
    color: '#1c343a',
    fontWeight: '500',
    fontSize: 16.33,
  },
});


const mapStateToProps = state => ({
  notifications: state.user.user.notification,
});

const mapActionsToProps = dispatch => ({
  updateNotificationSettings: (v, f) => dispatch(updateNotificationSettings(v, f)),
});

export default connect(mapStateToProps, mapActionsToProps)(PushNotifications);
