'use strict';

import React from 'react';
import Container from '../shared/Container';
import { connect } from 'react-redux';

import Products from '../Products';

import {
  loadMoreCurrentUser,
  setHasScrolled,
  scrollToTop,
  setCurrentRoute,
} from '../../actions';

class User extends React.Component {
  render() {
    let rightItem = {
      icon: require('image!settings'),
      onPress: () => console.log('Navigate!'),
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
          products={[]}
          title='SHARED PRODUCTS'
          cardSize='small'
          headerHeight={ headerHeight }
          loadMoreProducts={ this.loadMoreProducts }
          hasScrolled={ this.props.hasScrolled }
          scrollToTop={ this.props.scrollToTop }
          emptyListText="You haven't shared any products yet."
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
  scrollToTop: React.PropTypes.func,
  setHasScrolled: React.PropTypes.func,
  navigator: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  user: state.user,
  tab: state.navigation.tab,
});

const mapActionsToProps = (dispatch) => ({
  loadMoreProducts: () => dispatch(loadMoreCurrentUser()),
  setHasScrolled: () => dispatch(setHasScrolled('user')),
  scrollToTop: () => dispatch(scrollToTop()),
  setCurrentRoute: () => dispatch(setCurrentRoute('user')),
});

export default connect(mapStateToProps, mapActionsToProps)(User);
