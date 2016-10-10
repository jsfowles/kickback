'use strict';

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Container from '../shared/Container';
import { connect } from 'react-redux';

import Products from '../Products';
import ProfilePicture from './components/ProfilePicture';
import EarningsLink from './components/EarningsLink';

import {
  loadMoreCurrentUser,
  setHasScrolled,
  scrollToTop,
  setCurrentRoute,
  fetchUser,
  triggerModal,
} from '../../actions';

const HEADER_HEIGHT = 350;

const NEXT_ROUTE = {
  key: 'settings',
};

const { width: WIDTH } = Dimensions.get('window');

class User extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    fetchUser: React.PropTypes.func,
    navigator: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired,
    }),
  };

  componentDidMount() {
    this.props.fetchUser();
  }

  renderParallaxContent() {
    return <ProfilePicture />;
  }

  render() {
    const {
      handleNavigate,
      user,
      products,
      triggerModal,
    } = this.props;

    const rightItem = {
      icon: require('image!settings'),
      onPress: () => handleNavigate({ type: 'push', route: NEXT_ROUTE }, 'profile'),
    };

    return (
      <Container
        hasScrolled={ this.props.hasScrolled }
        setHasScrolled={ this.props.setHasScrolled }
        headerHeight={ HEADER_HEIGHT }
        rightItem={ rightItem }
        parallaxContent={ this.renderParallaxContent }
        headerStyles={ styles.header }
      >
        { products.length === 0 ? (
          <View />
        ) : (
          <Products
            ref='products'
            products={ products }
            title='SHARED PRODUCTS'
            cardSize='small'
            headerHeight={ HEADER_HEIGHT }
            loadMoreProducts={ this.loadMoreProducts }
            emptyListText="You haven't shared any products yet."
          />
        )}

        <EarningsLink
          position='left'
          earnings={ user.totalEarned }
          headerHeight={ HEADER_HEIGHT }
          icon={ require('image!earnings') }
          title='Total Earnings'
          handleNavigate={ () => triggerModal('earningsInfo') }
        />

        <EarningsLink
          position='right'
          earnings={ user.totalPendingOrWaitingApproval }
          headerHeight={ HEADER_HEIGHT }
          icon={ require('image!pending') }
          title='Total Pending'
          handleNavigate={ () => triggerModal('payoutInfo') }
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    width: WIDTH,
    right: 0,
    zIndex: 10,
  },
});

const mapStateToProps = state => ({
  user: state.user.user,
  products: state.user.products,
});

const mapActionsToProps = (dispatch) => ({
  triggerModal: modal => dispatch(triggerModal(modal)),
  loadMoreProducts: () => dispatch(loadMoreCurrentUser()),
  setHasScrolled: () => dispatch(setHasScrolled('user')),
  scrollToTop: () => dispatch(scrollToTop()),
  setCurrentRoute: () => dispatch(setCurrentRoute('user')),
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapActionsToProps)(User);
