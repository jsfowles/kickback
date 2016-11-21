import React from 'react';
import { connect } from 'react-redux';
import PushNotification from 'react-native-push-notification';

import {
  storeDeviceToken,
  receivePushNotification,
} from '../../actions';

class PushNotificationsController extends React.Component {
  static props: {
    storeDeviceToken: React.PropTypes.func.isRequired,
    receivePushNotification: React.PropTypes.func.isRequired,
    session: React.PropTypes.object,
  };

  componentDidMount() {
    PushNotification.configure({
      onRegister: ({ token }) => console.log(token),
      onNotification: this.props.receivePushNotification,
      requestPermissions: true,
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  session: state.session.session,
});

const mapActionsToProps = dispatch => ({
  storeDeviceToken: token => dispatch(storeDeviceToken(token)),
  receivePushNotification: notif => dispatch(receivePushNotification(notif)),
});

module.exports = connect(mapStateToProps, mapActionsToProps)(PushNotificationsController);
