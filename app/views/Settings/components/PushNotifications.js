import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Switch,
  Animated,
} from 'react-native';

import Container from '../../shared/Container';
import { updateNotificationSettings } from '../../../actions/';

class PushNotifications extends React.Component {
  static propTypes = {
    handleNavigate: React.PropTypes.func,
    updateNotificationSettings: React.PropTypes.func,
    notifications: React.PropTypes.shape({
      enabled: React.PropTypes.bool.isRequired,
      payableStatus: React.PropTypes.bool.isRequired,
      payableWorkCreated: React.PropTypes.bool.isRequired,
      payableWorkPaid: React.PropTypes.bool.isRequired,
      transactionCreated: React.PropTypes.bool.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.notificationContainerHeight = new Animated.Value(0);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.notifications.enabled !== this.props.notifications.enabled) {
      let toValue = this.props.notifications.enabled ? this.state.notificationHeight + 30 : 0;

      Animated.timing(
        this.notificationContainerHeight,
        { toValue, duration: 250 },
      ).start();
    }
  }

  onLayout = e => {
    let { enabled } = this.props.notifications;

    this.setState({ notificationHeight: e.nativeEvent.layout.height }, () =>{
      this.notificationContainerHeight.setValue( enabled ? this.state.notificationHeight + 30 : 0 );
    });
  }

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
          icon: require('./assets/images/back.png'),
          onPress: () => handleNavigate({ type: 'pop' }),
        }}
      >
        <View style={[ styles.inputContainer, { marginTop: 30 }]}>
          <View style={ styles.switchContainer }>
            <Text style={ styles.label }>Allow Notifications</Text>
            <Switch
              value={ enabled }
              onValueChange={ v => updateNotificationSettings(v, 'enabled') }
            />
          </View>
        </View>

        <Animated.View style={{ height: this.notificationContainerHeight, overflow: 'hidden' }}>
          <View style={[ styles.inputContainer, { marginTop: 30 }]} onLayout={ this.onLayout }>
            <View style={[ styles.switchContainer, styles.borderBottom ]}>
              <Text style={ styles.label }>Purchase Made</Text>
              <Switch
                disabled={ !enabled }
                value={ transactionCreated }
                onValueChange={ v => updateNotificationSettings(v, 'transaction_created') }
              />
            </View>

            <View style={[ styles.switchContainer, styles.borderBottom ]}>
              <Text style={ styles.label }>Payment in Processing</Text>
              <Switch
                disabled={ !enabled }
                value={ payableWorkCreated }
                onValueChange={ v => updateNotificationSettings(v, 'payable_work_created') }
              />
            </View>

            <View style={[ styles.switchContainer, styles.borderBottom ]}>
              <Text style={ styles.label }>Payment Deposited</Text>
              <Switch
                disabled={ !enabled }
                value={ payableWorkPaid }
                onValueChange={ v => updateNotificationSettings(v, 'payable_work_paid') }
              />
            </View>

            <View style={ styles.switchContainer }>
              <Text style={ styles.label }>Payable Status</Text>
              <Switch
                disabled={ !enabled }
                value={ payableStatus }
                onValueChange={ v => updateNotificationSettings(v, 'payable_status') }
              />
            </View>
          </View>
        </Animated.View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e8edef',
    borderBottomWidth: 1,
    borderBottomColor: '#e8edef',
    paddingLeft: 15,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 15,
  },

  borderBottom: {
    borderBottomColor: '#e8edef',
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
