'use strict';

import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  RefreshControl,
} from 'react-native';
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
  fetchUserProducts,
} from '../../actions';

const HEADER_HEIGHT = 350;

const NEXT_ROUTE = {
  key: 'settings',
};

const { width: WIDTH } = Dimensions.get('window');

class User extends React.Component {
  static propTypes = {
    user: React.PropTypes.shape({
      email: React.PropTypes.string,
      name: React.PropTypes.string,
      totalApproved: React.PropTypes.number.isRequred,
      totalPendingOrWaitingApproval: React.PropTypes.number.isRequired,
    }),
    fetchUser: React.PropTypes.func,
    navigator: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired,
    }),
    // TODO: We should make this a shape one day.
    products: React.PropTypes.array,
    triggerModal: React.PropTypes.func,
    handleNavigate: React.PropTypes.func,
    fetchUserProducts: React.PropTypes.func.isRequired,
    isFetchingUserProducts: React.PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      anim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchUserProducts();
  }

  renderParallaxContent = () => {
    return <ProfilePicture animatedStyles={ this.animatedStyles() } user={ this.props.user } />;
  }

  handleScroll = e => {
    this.state.anim.setValue(e.nativeEvent.contentOffset.y);
  }

  animatedStyles = () => {
    let opacity = this.state.anim.interpolate({
      inputRange: [ -100, 0, 45 ],
      outputRange: [ 0, 1, 0 ],
      extrapolate: 'clamp',
    });

    let translateY = this.state.anim.interpolate({
      inputRange: [ -100, 0, 45, 46 ],
      outputRange: [ 25, 0, -20, 2000 ],
      extrapolate: 'clamp',
    });

    return {
      opacity,
      transform: [{ translateY }],
    };
  }
  

  render() {
    const {
      handleNavigate,
      user,
      products,
      triggerModal,
      isFetchingUserProducts,
      fetchUserProducts,
    } = this.props;

    const rightItem = {
      icon: require('image!settings'),
      onPress: () => handleNavigate({ type: 'push', route: NEXT_ROUTE }, 'profile'),
    };

    if (user) {
      return (
        <Container
          headerHeight={ HEADER_HEIGHT }
          style={{ paddingTop: 20 }}
          rightItem={ rightItem }
          headerStyles={ styles.header }
          offset={ this.state.anim }
          showParallaxBackground={ true }
          parallaxContent={ this.renderParallaxContent }
        >
          { products.length === 0 ? (
            <View style={{ paddingTop: HEADER_HEIGHT }}>
              <Text style={ styles.emptyText }>You haven’t Shared any products yet.</Text>
            </View>
          ) : (
            <Products
              ref='products'
              products={ products }
              title='SHARED PRODUCTS'
              cardSize='small'
              headerHeight={ HEADER_HEIGHT }
              loadMoreProducts={ this.loadMoreProducts }
              emptyListText="You haven't shared any products yet."
              onScroll={ this.handleScroll }
              refreshControl={ <RefreshControl
                refreshing={ isFetchingUserProducts }
                tintColor='#d4d9da'
                onRefresh={ fetchUserProducts }
              /> }
            />
          )}

          <EarningsLink
            position='left'
            earnings={ user.totalEarned }
            headerHeight={ HEADER_HEIGHT }
            icon={ require('image!earnings') }
            title='Total Earnings'
            offset={ this.state.anim }
            animatedStyles={ this.animatedStyles() }
            handleNavigate={ () => triggerModal('earningsInfo') }
          />

          <EarningsLink
            position='right'
            earnings={ user.totalPendingOrWaitingApproval }
            headerHeight={ HEADER_HEIGHT }
            icon={ require('image!pending') }
            title='Total Pending'
            offset={ this.state.anim }
            animatedStyles={ this.animatedStyles() }
            handleNavigate={ () => triggerModal('payoutInfo') }
          />
        </Container>
      );
    }

    return null;
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

  emptyText: {
    marginTop: 100,
    textAlign: 'center',
    color: '#adadad',
    fontSize: 17,
  },
});

const mapStateToProps = state => ({
  user: state.user.user,
  products: state.user.products,
  isFetchingUserProducts: state.user.isFetchingUserProducts,
});

const mapActionsToProps = (dispatch) => ({
  triggerModal: modal => dispatch(triggerModal(modal)),
  loadMoreProducts: () => dispatch(loadMoreCurrentUser()),
  setHasScrolled: () => dispatch(setHasScrolled('user')),
  scrollToTop: () => dispatch(scrollToTop()),
  setCurrentRoute: () => dispatch(setCurrentRoute('user')),
  fetchUser: () => dispatch(fetchUser()),
  fetchUserProducts: () => dispatch(fetchUserProducts()),
  fetchUserProfile: () => dispatch(fetchUserProfile()),
});

export default connect(mapStateToProps, mapActionsToProps)(User);
