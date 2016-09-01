'use strict';

import React from 'react';
import { connect } from 'react-redux';

import {
  View,
  Navigator,
} from 'react-native';

import User from '../User';
import Settings from '../Settings';

class Profile extends React.Component {
  renderScene = (route, navigator) => {
    let props = {
      ...this.props,
      navigator: navigator,
    };

    switch (route.id) {
    case 1:
      return <Settings { ...props } />;
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
