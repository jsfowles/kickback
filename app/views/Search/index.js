'use strict';

import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Products from '../Products';
import Container from '../shared/Container';


class Search extends React.Component {
  static propTypes = {
    search: React.PropTypes.shape({
      errorMessage: React.PropTypes.string,
      isFetching: React.PropTypes.bool,
      searchOverlay: React.PropTypes.bool,
      products: React.PropTypes.array,
    }).isRequired,
  };

  render() {
    let { search } = this.props;

    return (
      <Container style={ styles.container }>
        { search.isFetching ? (
          <Text>Searching...</Text>
        ) : (
          <Products
            products={ search.products }
            cardSize={ 'large' }
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

const mapStateToProps = (state) => ({
  search: state.search,

});

const mapActionsToProps = (_) => ({

});

export default connect(mapStateToProps, mapActionsToProps)(Search);
