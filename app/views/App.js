import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  AppState,
  StyleSheet,
} from 'react-native';

import {
  loadProductFeed,
  loadCurrentUser,
} from '../actions';

import Navigation from './Navigation';
import Session from './Sessions';
import Tabs from './Navigation/components/Tabs';

const scenes = {
  tabs: <Tabs />,
  session: <Session />,
};

/**
 * App Component
 * @description: This component sets up the tabbar Since we don't care if
 *               the user is logged in on the featured products tab.
 */
class App extends Component {
  /**
   * When component mounts update the AppState
   * @returns { void }
   */
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);

    let { currentUser, loadProductFeed, loadCurrentUser } = this.props;

    loadProductFeed();

    if (currentUser.id) {
      loadCurrentUser(currentUser);
    }
  }

  /**
   * Remove AppState event listener when unmounting
   * @returns { void }
   */
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  /**
   * Handle the app state change
   * @todo: when app is active sync all the things
   * @returns { void }
   */
  handleAppStateChange = () => {
    if (AppState.currentState === 'active') {
      this.props.loadProductFeed();
    }
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={ styles.container }>
        <Navigation
          scenes={ scenes }
          navigation={ navigation }
          direction='vertical'
        />
      </View>
    );
  }
}

App.propTypes = {
  navigation: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.object.isRequired,
  loadProductFeed: React.PropTypes.func.isRequired,
  loadCurrentUser: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

const mapStateToProps = (state) => ({
  loading: state.product.creatingRecommendation,
  currentUser: state.currentUser,
  navigation: state.navigation.global,
});

const mapActionsToProps = (dispatch) => ({
  loadProductFeed: () => dispatch(loadProductFeed()),
  loadCurrentUser: (currentUser) => dispatch(loadCurrentUser(currentUser)),
});

export default connect(mapStateToProps, mapActionsToProps)(App);
