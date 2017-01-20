import React from 'react';
import { connect } from 'react-redux';
import PushNotification from 'react-native-push-notification';

import {
  storeDeviceToken,
  receivePushNotification,
} from '../../actions';

class PushNotificationsController extends React.Component {
  static propTypes = {
    storeDeviceToken: React.PropTypes.func.isRequired,
    user: React.PropTypes.shape({
      notification: React.PropTypes.shape({
        enabled: React.PropTypes.bool,
      }).isRequired,
    }),
    receivePushNotification: React.PropTypes.func.isRequired,
  };

  pushNotification() {
    let {
      storeDeviceToken,
      receivePushNotification,
      user,
    } = this.props;

    PushNotification.configure({
      onRegister: storeDeviceToken,
      onNotification: receivePushNotification,
      requestPermissions: !!user && user.notification.enabled,
    });
  }

  componentDidMount() {
    this.pushNotification();
  }

  componentDidUpdate() {
    this.pushNotification();
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
});

const mapActionsToProps = dispatch => ({
  storeDeviceToken: ({ token }) => dispatch(storeDeviceToken(token)),
  receivePushNotification: notif => dispatch(receivePushNotification(notif)),
});

module.exports = connect(mapStateToProps, mapActionsToProps)(PushNotificationsController);
