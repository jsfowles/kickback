'use strict';

import React from 'react';
import { connect } from 'react-redux';

import { View } from 'react-native';

import Navigation from '../Navigation';
import User from '../User';
import EditProfile from '../User/Edit';
import Settings from '../Settings';
import WebView from '../Settings/components/WebView';
import ReportAProblem from '../Settings/components/ReportAProblem';
import DepositSettings from '../Settings/components/DepositSettings';
import ChangePassword from '../Settings/components/ChangePassword';

const scenes = {
  settings: <Settings />,
  privacyPolicy: <WebView url='http://www.kbck.me/privacy-policy' title='Privacy Policy' />,
  terms: <WebView url='http://www.kbck.me/terms-and-conditions' title='Terms' />,
  spamOrAbuse: <ReportAProblem subject='Spam or Abuse' />,
  somethingIsntWorking: <ReportAProblem subject="Something isn't Working" />,
  generalFeedback: <ReportAProblem subject='General Feedback' />,
  user: <User />,
  editProfile: <EditProfile />,
  changePassword: <ChangePassword />,
  depositSettings: <DepositSettings />,
  payablesFaq: <WebView url='http://www.kbck.me/payable-faq' title='Payable FAQ' />,
};

class Profile extends React.Component {
  static propTypes = {
    navigation: React.PropTypes.object.isRequired,
  };

  render() {
    let { navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Navigation
          navigation= { navigation }
          scenes={ scenes }
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation.profile,
});

const mapActionsToProps = _ => ({});

export default connect(mapStateToProps, mapActionsToProps)(Profile);
