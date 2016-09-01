'use strict';

import React, { Component } from 'react';
import { Navigator, StyleSheet } from 'react-native';

import Tabs from './components/Tabs';

class Navigation extends Component {
  renderScene = (route, navigator) => {
    return <Tabs navigator={ navigator } />;
  }

  render() {
    return (
      <Navigator
        ref='navigator'
        style={ styles.container }
        initialRout={{}}
        renderScene={ this.renderScene }
        configureScene={ (route) => {} }
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
