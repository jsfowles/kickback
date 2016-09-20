'used strict';

import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet } from 'react-native';

import Container from '../shared/Container';
import Products from '../Products';

class FeaturedProducts extends React.Component {
  render() {
    let { feed } = this.props;

    return (
      <Container style={ styles.container }>
        { feed.isFetching ? (
          <Text>Fetching Products</Text>
        ) : (
          <Products
            products={ feed.products }
            cardSize={ 'large' }
            title={ 'FEATURED PRODUCTS' }
          />
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 65,
  },
});

const mapStateToProps = state => ({
  feed: state.feed,
});

const mapActionsToProps = _ => ({});

export default connect(mapStateToProps, mapActionsToProps)(FeaturedProducts);
