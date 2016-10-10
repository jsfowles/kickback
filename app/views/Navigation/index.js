'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationExperimental, StyleSheet } from 'react-native';

import {
  push,
  pop,
} from '../../actions';

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

const selectScene = scenes => route => scenes[route] || null;

class Navigation extends Component {
  handleNavigate = ({ route, type }) => {
    let { pushRoute, popRoute, navigation } = this.props;

    switch (type) {
      case 'push': return pushRoute(route, navigation.key);
      case 'pop': return popRoute(navigation.key);
      default: return false;
    }
  }

  renderScene = ({ scene }) => {
    const { scenes } = this.props;
    let selectedScene = selectScene(scenes)(scene.route.key);

    return React.cloneElement(selectedScene, {
      handleNavigate: (route) => this.handleNavigate(route),
    });
  }

  render() {
    const { navigation, direction } = this.props;

    return (
      <NavigationCardStack
        style={ styles.container }
        navigationState={ navigation }
        direction={ direction }
        onNavigate={ this.handleNavigate }
        renderScene={ this.renderScene }
      />
    );
  }
}

Navigation.propTypes = {
  direction: React.PropTypes.string,
  navigation: React.PropTypes.object.isRequired,
  pushRoute: React.PropTypes.func.isRequired,
  popRoute: React.PropTypes.func.isRequired,
  scene: React.PropTypes.shape({
    route: React.PropTypes.object.isRequired,
  }),
};

Navigation.defaultProps = {
  direction: 'horizontal',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = _ => ({});

const mapActionsToProps = dispatch => ({
  pushRoute: (route, key) => dispatch(push(route, key)),
  popRoute: key => dispatch(pop(key)),
});

export default connect(mapStateToProps, mapActionsToProps)(Navigation);
