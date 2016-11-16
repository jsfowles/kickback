'use strict';

import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';

import Products from '../Products';
import Container from '../shared/Container';


class Search extends React.Component {
  static propTypes = {
    search: React.PropTypes.shape({
      flashMessage: React.PropTypes.string,
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
          <View style={ styles.centering }>
            <ActivityIndicator size='large' />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            { search.products.length ? (
              <Products
                products={ search.products }
                cardSize={ 'large' }
              />
            ) : (
              <View style={ styles.centering }>
                <Text style={ styles.emptyText }>No products found</Text>
              </View>
            )}
          </View>
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

  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -130,
  },

  emptyText: {
    marginTop: 100,
    textAlign: 'center',
    color: '#adadad',
    fontSize: 17,
  },
});

const mapStateToProps = (state) => ({
  search: state.search,
});

const mapActionsToProps = _ => ({});

export default connect(mapStateToProps, mapActionsToProps)(Search);
