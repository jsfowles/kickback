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
  fetchValidateSession,
  closeModal,
} from '../actions';

import Navigation from './Navigation';
import Session from './Sessions';
import Message from './shared/Message';
import Tabs from './Navigation/components/Tabs';
import EarningsInfo from './User/components/EarningsInfo';
import PayoutInfo from './User/components/PayoutInfo';
import ProductModal from './Products/components/Modal';

const scenes = {
  tabs: <Tabs />,
  session: <Session />,
  earningsInfo: <EarningsInfo />,
  payoutInfo: <PayoutInfo />,
  ProductModal: <ProductModal />,
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
    fetchValidateSession: React.PropTypes.func.isRequired,
    closeModal: React.PropTypes.func.isRequired,
    message: React.PropTypes.object,
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);

    this.props.closeModal();
    this.props.fetchValidateSession();
    this.props.fetchFeed();
  }

  /**
   * Remove AppState event listener when unmounting
   * @returns { void }
   */
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  /**
   * @returns { function }
   *
   * Lets load the app.
   * When component mounts or is set to active update the AppState,
   * if there is a session && user then lets load the user, else
   * make sure there is no session or use by calling destroySession.
   */
  loadApp() {
    this.props.fetchValidateSession();
    return this.props.fetchFeed();
  }

  handleAppStateChange = (state) => {
    if (state === 'active') { return this.loadApp(); }
  }

  render() {
    const { navigation, message } = this.props;

    return (
      <View style={ styles.container }>
        { message && <Message message={ message } /> }

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
  message: state.app.message,
});

const mapActionsToProps = dispatch => ({
  fetchFeed: _ => dispatch(fetchFeed()),
  fetchUserProducts: user => dispatch(fetchUserProducts(user)),
  fetchValidateSession: _ => dispatch(fetchValidateSession()),
  closeModal: _ => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapActionsToProps)(App);
