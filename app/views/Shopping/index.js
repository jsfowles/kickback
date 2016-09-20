'use strict';
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import Navigation from '../Navigation';
import Header from './components/Header';
import Feed from '../FeaturedProducts';
import Search from '../Search';

const {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window')

const scenes = {
  feed: <Feed />,
  search: <Search />,
};

class Shopping extends React.Component {
  render() {
    let { navigation } = this.props;

    return (
      <View style={ styles.container }>
        <LinearGradient
          style={ styles.headerWrapper }
          colors={[ '#45baef', '#34Bcd5' ]}
        >
          <Header />
        </LinearGradient>

        <Navigation
          navigation={ navigation }
          scenes={ scenes }
        />
      </View>
    );
  }
}

Shopping.propTypes = {
  navigation: React.PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 65,
    zIndex: 10,
    width: deviceWidth,
    paddingHorizontal: 10,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});

const mapStateToProps = state => ({
  navigation: state.navigation.shopping,
});

const mapActionsToProps = _ => ({});

export default connect(mapStateToProps, mapActionsToProps)(Shopping);
