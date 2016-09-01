'use strict';
import React from 'react';
import { Navigator, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Header from './components/Header';
import FeaturedProducts from '../FeaturedProducts';
import Search from '../Search';
import SearchOverlay from '../Search/components/SearchOverlay';
import LinearGradient from 'react-native-linear-gradient';
import SessionModal from '../Sessions';

class Shopping extends React.Component {
  renderScene = (route, navigator) => {
    let scene = {
      0: <FeaturedProducts />,
      1: <Search />,
    };

    return React.cloneElement(
      scene[route.index],
      { navigator, route, ...this.props },
      <SearchOverlay />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          style={ styles.headerWrapper }
          colors={[ '#45baef', '#34Bcd5' ]}
        >
          <Header />
        </LinearGradient>

        <Navigator
          initialRoute={{ name: 'Featured Products', index: 0 }}
          renderScene={ this.renderScene }
        />

        <SessionModal modalVisible={ this.props.modalVisible } />
      </View>
    );
  }
}

Shopping.propTypes = {
  modalVisible: React.PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  headerWrapper: {
    height: 65,
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
  modalVisible: state.session.modalVisible,
});

const mapActionsToProps = _ => ({});

export default connect(mapStateToProps, mapActionsToProps)(Shopping);
