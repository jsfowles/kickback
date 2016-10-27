'used strict';

import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, RefreshControl } from 'react-native';

import { fetchFeed } from '../../actions';
import Container from '../shared/Container';
import Products from '../Products';

const FeaturedProducts = ({ feed, fetchFeed }) => (
  <Container style={ styles.container }>
    { feed.isFetching && feed.products.length === 0 ? (
      <Text>Fetching Products</Text>
    ) : (
      <Products
        products={ feed.products }
        cardSize={ 'large' }
        title={ 'FEATURED PRODUCTS' }
        refreshControl={ <RefreshControl
          refreshing={ feed.isFetching }
          tintColor='#d4d9da'
          onRefresh={ fetchFeed }
        /> }
      />
    )}
  </Container>
);

FeaturedProducts.propTypes = {
  fetchFeed: React.PropTypes.func.isRequired,
  feed: React.PropTypes.shape({
    products: React.PropTypes.array.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 65,
  },
});

const mapStateToProps = state => ({
  feed: state.feed,
});

const mapActionsToProps = dispatch => ({
  fetchFeed: () => dispatch(fetchFeed()),
});

export default connect(mapStateToProps, mapActionsToProps)(FeaturedProducts);
