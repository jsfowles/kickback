'use strict';

import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

import Products from '../Products';
import Container from '../shared/Container';
import {
  setHasScrolled,
  scrollToTop,
} from '../../actions';

class Search extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, paddingTop: 65 }}>
        <Text>Search</Text>
        <TouchableHighlight
          style={{ flex: 1 }}
          underlayColor='pink'
          onPress={ () => this.props.handleNavigate({ type: 'pop' }) }
        >
          <Text>Button</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  searchResults: state.search.searchResults,
  searchOverlay: state.search.searchOverlay,
  route: state.navigation.route,
  searching: state.search.searching,
  fetchingProducts: state.search.fetchingProducts,
  hasScrolled: state.search.hasScrolled,
});

const mapActionsToProps = (dispatch) => ({
  setHasScrolled: () => dispatch(setHasScrolled('search')),
  scrollToTop: () => dispatch(scrollToTop()),
});

export default connect(mapStateToProps, mapActionsToProps)(Search);
