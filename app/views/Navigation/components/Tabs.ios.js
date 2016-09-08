'use strict';

import React from 'react';
import { TabBarIOS } from 'react-native';
import { connect } from 'react-redux';

import {
  switchTab,
  cancelSearch,
  scrollToTop,
  setCurrentRoute,
  toggleSessionModal,
} from '../../../actions';

import Profile from '../../Profile';
import Shopping from '../../Shopping';

class Tabs extends React.Component {
  switchTab = (tab) => {
    let {
      currentUser,
      toggleSessionModal,
      searching,
      cancelSearch,
      scrollToTop,
      setCurrentRoute,
      switchTab,
      navigator,
    } = this.props;

    if (this.props.tab === tab) { return scrollToTop(); }
    if (currentUser) { return navigator.push({ id: 1 }); }
    if (searching) { cancelSearch(); }

    switchTab(tab);

    if (tab === 'SHOPPING_TAB') {
      return setCurrentRoute('productFeed');
    }

    return setCurrentRoute('user');
  }

  render() {
    let { tab } = this.props;

    return (
      <TabBarIOS
        tintColor='#3987d5'
        barTintColor='#fff'
        translucent={ false }
      >
        <TabBarIOS.Item
          icon={ require('image!cart') }
          title=''
          selected={ tab === 'SHOPPING_TAB' }
          onPress={ () => this.switchTab('SHOPPING_TAB') }
        >
          { tab === 'SHOPPING_TAB' && <Shopping /> }
        </TabBarIOS.Item>

        <TabBarIOS.Item
          icon={ require('image!user') }
          title=''
          selected={ tab === 'USER_TAB' }
          onPress={ () => this.switchTab('USER_TAB') }
        >
          { tab === 'USER_TAB' && <Profile /> }
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

Tabs.propTypes = {
  currentUser: React.PropTypes.object,
  switchTab: React.PropTypes.func.isRequired,
  toggleSessionModal: React.PropTypes.func.isRequired,
  cancelSearch: React.PropTypes.func.isRequired,
  scrollToTop: React.PropTypes.func.isRequired,
  setCurrentRoute: React.PropTypes.func.isRequired,
  tab: React.PropTypes.string.isRequired,
  searching: React.PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  tab: state.navigation.tab,
  searching: state.search.searching,
  currentUser: state.currentUser,
});

const mapActionsToProps = (dispatch) => ({
  toggleSessionModal: () => dispatch(toggleSessionModal(true)),
  switchTab: (tab) => dispatch(switchTab(tab)),
  cancelSearch: () => dispatch(cancelSearch()),
  scrollToTop: () => dispatch(scrollToTop('user')),
  setCurrentRoute: (route) => dispatch(setCurrentRoute(route)),
});

export default connect(mapStateToProps, mapActionsToProps)(Tabs);
