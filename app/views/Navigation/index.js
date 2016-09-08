'use strict';

import React, { Component } from 'react';
import { Navigator, StyleSheet } from 'react-native';

import Tabs from './components/Tabs';
import SessionModal from '../Sessions';

class Navigation extends Component {
  renderScene = (route, navigator) => {
    let props = { ...this.props, navigator, route };

    switch (route.id) {
    case 1:
      return <SessionModal { ...props } />;
    default:
      return <Tabs { ...props } />;
    }
  }

  configureScene = _ => {
    return Navigator.SceneConfigs.FloatFromBottom;
  }

  render() {
    return (
      <Navigator
        style={ styles.container }
        initialRoute={{}}
        configureScene={ this.configureScene }
        renderScene={ this.renderScene }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default Navigation;
