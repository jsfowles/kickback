'use strict';

import React from 'react';
import { View, Text, } from 'react-native';
import Container from '../shared/Container';
import { connect } from 'react-redux';

import { navigateSettings } from '../../actions/settings';
import Products from '../Products';
import ParallaxContent from './components/ParallaxContent';
import ParallaxBackground from '../shared/ParallaxBackground';

import {
  loadMoreCurrentUser,
  setHasScrolled,
  scrollToTop,
  setCurrentRoute,
  destroySession,
} from '../../actions';

class User extends React.Component {
  loadMoreProducts = () => {
    if (!this.props.nextPageUrl) { return };
    this.props.loadMoreProducts();
  }

  render() {
    let rightItem = {
      icon: require('image!settings'),
      onPress: () => this.props.navigateSettings(),
    };

    let headerHeight = 350;

    return (
      <Container
        style={{ paddingTop: 20 }}
        hasScrolled={ this.props.hasScrolled }
        setHasScrolled={ this.props.setHasScrolled }
        headerHeight={ headerHeight }
        parallaxContent={ true }
      >
        <Products
          ref='products'
          products={ this.props.user.sharedProducts }
          title='SHARED PRODUCTS'
          cardSize='small'
          headerHeight={ headerHeight }
          loadMoreProducts={ this.loadMoreProducts }
          hasScrolled={ this.props.hasScrolled }
          scrollToTop={ this.props.scrollToTop }
          emptyListText="You haven't shared any products yet."
          header={ <ParallaxContent logout={ this.props.destroySession } user={ this.props.user } /> }
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  nextPageUrl: state.user.nextPageUrl,
  hasScrolled: state.user.hasScrolled,
  tab: state.navigation.tab,
});

const mapActionsToProps = (dispatch) => ({
  navigateSettings: () => dispatch(navigateSettings()),
  loadMoreProducts: () => dispatch(loadMoreCurrentUser()),
  setHasScrolled: () => dispatch(setHasScrolled('user')),
  scrollToTop: () => dispatch(scrollToTop()),
  setCurrentRoute: () => dispatch(setCurrentRoute('user')),
  destroySession: () => dispatch(destroySession()),
});

export default connect(mapStateToProps, mapActionsToProps)(User);
