'use strict';

import React from 'react';
import { connect } from 'react-redux';

import { View } from 'react-native';

import Navigation from '../Navigation';
import User from '../User';
import Settings from '../Settings';
import WebView from '../Settings/components/WebView';
import ReportAProblem from '../Settings/components/ReportAProblem';

const scenes = {
  settings: <Settings />,
  privacyPolicy: <WebView url='http://www.kbck.me/privacy-policy' title='Privacy Policy' />,
  terms: <WebView url='http://www.kbck.me/terms-and-conditions' title='Terms' />,
  reportAProblem: <ReportAProblem />,
  user: <User />,
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
