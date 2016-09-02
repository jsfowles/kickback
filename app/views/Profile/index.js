'use strict';

import React from 'react';
import { connect } from 'react-redux';

import {
  View,
  Navigator,
} from 'react-native';

import User from '../User';
import Settings from '../Settings';
import WebView from '../Settings/components/WebView';
import ReportAProblem from '../Settings/components/ReportAProblem';

class Profile extends React.Component {
  renderScene = (route, navigator) => {
    let props = { ...this.props, navigator, route };

    switch (route.id) {
    case 1:
      return <Settings { ...props } />;
    case 5:
      return <WebView { ...props } url='http://www.kbck.me/privacy-policy' title='Privacy Policy' />;
    case 6:
      return <WebView { ...props } url='http://www.kbck.me/terms-and-conditions' title='Terms' />;
    case 7:
      return <ReportAProblem { ...props } />;
    default:
      return <User { ...props } />;
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          initialRoute={{}}
          renderScene={ this.renderScene }
        />
      </View>
    );
  }
}

const mapStateToProps = _ => ({});
const mapActionsToProps = _ => ({});

export default connect(mapStateToProps, mapActionsToProps)(Profile);
