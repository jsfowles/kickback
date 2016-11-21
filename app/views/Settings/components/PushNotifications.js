import React from 'react';
import {
  PushNotificationIOS,
  AlertIOS,
  StyleSheet,
  View,
  Text,
  Switch,
} from 'react-native';

import Container from '../../shared/Container';

class PushNotifications extends React.Component {
  static propTypes = {
    handleNavigate: React.PropTypes.func,
  };

  componentWillMount() {
    PushNotificationIOS.addEventListener('notification', this.onRemoteNotification);
  }

  componentWillUnmount() {
    PushNotificationIOS.removeEventListener('notification', this.onRemoteNotification);
  }

  render() {
    let { handleNavigate } = this.props;

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
            <Switch />
          </View>
        </View>

        <View style={[ styles.inputContainer, { marginTop: 30 }]}>
          <View style={[ styles.switchContainer, styles.borderBottom ]}>
            <Text style={ styles.label }>Purchase Made</Text>
            <Switch />
          </View>

          <View style={[ styles.switchContainer, styles.borderBottom ]}>
            <Text style={ styles.label }>Payment in Processing</Text>
            <Switch />
          </View>

          <View style={[ styles.switchContainer, styles.borderBottom ]}>
            <Text style={ styles.label }>Payment Deposited</Text>
            <Switch />
          </View>

          <View style={ styles.switchContainer }>
            <Text style={ styles.label }>Payable Status</Text>
            <Switch />
          </View>
        </View>
      </Container>
    );
  }

  onRemoteNotification(notification) {
    AlertIOS.alert(
      'Push Notification Received',
      'Alert message: ' + notification.getMessage(),
      [{
        text: 'Dismiss',
        onPress: null,
      }]
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

export default PushNotifications;
