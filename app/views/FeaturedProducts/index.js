'used strict';

import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableHighlight } from 'react-native';

import Products from '../Products';
import FeaturedCarousel from './components/FeaturedSearchesCarousel';

import {
  loadMoreProductFeed,
  setHasScrolled,
  scrollToTop,
} from '../../actions';

const route = {
  type: 'push',
  route: { key: 'search' },
};

import Container from '../shared/Container';

class FeaturedProducts extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, paddingTop: 65 }}>
        <Text>Feed</Text>

        <TouchableHighlight
          style={{ flex: 1 }}
          underlayColor='pink'
          onPress={ () => this.props.handleNavigate(route) }
        >
          <Text>Button</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = _ => ({});
const mapActionsToProps = _ => ({});

export default connect(mapStateToProps, mapActionsToProps)(FeaturedProducts);
