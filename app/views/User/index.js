'use strict';

import React from 'react';
import Container from '../shared/Container';
import { connect } from 'react-redux';

import Products from '../Products';
import ParallaxContent from './components/ParallaxContent';

import {
  loadMoreCurrentUser,
  setHasScrolled,
  scrollToTop,
  setCurrentRoute,
  destroySession,
} from '../../actions';

class User extends React.Component {
  loadMoreProducts = () => {
    if (!this.props.nextPageUrl) { return; }
    this.props.loadMoreProducts();
  }

  render() {
    let rightItem = {
      icon: require('image!settings'),
      onPress: () => this.props.navigator.push({ id: 1 }),
    };

    let headerHeight = 350;

    return (
      <Container
        hasScrolled={ this.props.hasScrolled }
        setHasScrolled={ this.props.setHasScrolled }
        headerHeight={ headerHeight }
        parallaxContent={ true }
        rightItem={ rightItem }
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

User.propTypes = {
  nextPageUrl: React.PropTypes.string,
  loadMoreProducts: React.PropTypes.func,
  navigateSettings: React.PropTypes.func,
  hasScrolled: React.PropTypes.bool,
  destroySession: React.PropTypes.func,
  scrollToTop: React.PropTypes.func,
  setHasScrolled: React.PropTypes.func,
  user: React.PropTypes.object.isRequired,
  navigator: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  user: state.user,
  nextPageUrl: state.user.nextPageUrl,
  hasScrolled: state.user.hasScrolled,
  tab: state.navigation.tab,
});

const mapActionsToProps = (dispatch) => ({
  loadMoreProducts: () => dispatch(loadMoreCurrentUser()),
  setHasScrolled: () => dispatch(setHasScrolled('user')),
  scrollToTop: () => dispatch(scrollToTop()),
  setCurrentRoute: () => dispatch(setCurrentRoute('user')),
  destroySession: () => dispatch(destroySession()),
});

export default connect(mapStateToProps, mapActionsToProps)(User);
