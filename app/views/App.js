import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  AppState,
  StyleSheet,
} from 'react-native';

import {
  fetchFeed,
  fetchUserProducts,
  destroySession,
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
  static propTypes = {
    navigation: React.PropTypes.object.isRequired,
    user: React.PropTypes.object,
    session: React.PropTypes.object,
    fetchFeed: React.PropTypes.func.isRequired,
    fetchUserProducts: React.PropTypes.func.isRequired,
    destroySession: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    // this.props.destroySession();
    AppState.addEventListener('change', this.handleAppStateChange);
    return this.loadApp();
  }

  /**
   * Remove AppState event listener when unmounting
   * @returns { void }
   */
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  /**
   * @returns { destroySession }
   *
   * Lets load the app.
   * When component mounts or is set to active update the AppState,
   * if there is a session && user then lets load the user, else
   * make sure there is no session or use by calling destroySession.
   */
  loadApp() {
    // TODO: I should validate tokens before fetching user stuff.
    let { fetchFeed, fetchUserProducts, session, destroySession, user } = this.props;

    fetchFeed();

    if (session && user) { return fetchUserProducts(); }
    return destroySession();
  }

  /**
   * Handle the app state change
   * @todo: when app is active sync all the things
   * @returns { void }
   */
  handleAppStateChange = () => {
    this.loadApp();
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

const styles = StyleSheet.create({
  container: { flex: 1 },
});

const mapStateToProps = state => ({
  loading: state.product.creatingRecommendation,
  session: state.session.session,
  user: state.user.user,
  currentUser: state.currentUser,
  navigation: state.navigation.global,
});

const mapActionsToProps = (dispatch) => ({
  fetchFeed: () => dispatch(fetchFeed()),
  fetchUserProducts: (user) => dispatch(fetchUserProducts(user)),
  destroySession: _ => dispatch(destroySession()),
});

export default connect(mapStateToProps, mapActionsToProps)(App);
