'use strict';

import React from 'react';
import { View } from 'react-native';
import Container from '../shared/Container';
import { connect } from 'react-redux';

import Products from '../Products';
import ProfilePicture from './components/ProfilePicture'

import {
  loadMoreCurrentUser,
  setHasScrolled,
  scrollToTop,
  setCurrentRoute,
  fetchUser,
} from '../../actions';

const HEADER_HEIGHT = 350;

const NEXT_ROUTE = {
  key: 'settings',
};

class User extends React.Component {
  static propTypes = {
    products: React.PropTypes.arrayOf(React.PropTypes.shape({
      // TODO: Add products proptypes
    }).isRequired).isRequired,
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
      products,
      handleNavigate,
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
            hasScrolled={ this.props.hasScrolled }
            scrollToTop={ this.props.scrollToTop }
            emptyListText="You haven't shared any products yet."
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  products: state.user.products,
});

const mapActionsToProps = (dispatch) => ({
  loadMoreProducts: () => dispatch(loadMoreCurrentUser()),
  setHasScrolled: () => dispatch(setHasScrolled('user')),
  scrollToTop: () => dispatch(scrollToTop()),
  setCurrentRoute: () => dispatch(setCurrentRoute('user')),
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapActionsToProps)(User);
