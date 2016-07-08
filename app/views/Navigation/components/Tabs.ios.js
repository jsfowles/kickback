'use strict'
import React from 'react'
import { TabBarIOS, View, } from 'react-native'
import { connect } from 'react-redux'

import {
  switchTab,
  cancelSearch,
  scrollToTop,
  setCurrentRoute,
  toggleSessionModal,
} from '../../../actions'

import User from '../../User'
import Shopping from '../../Shopping'

class Tabs extends React.Component {
  switchTab = (tab) => {
    if (true) { return this.props.toggleSessionModal(); }

    if (this.props.searching) this.props.cancelSearch();
    if (this.props.tab === tab) return this.props.scrollToTop();

    this.props.switchTab(tab);

    if (tab === 'SHOPPING_TAB') {
      return this.props.setCurrentRoute('productFeed');
    } else {
      return this.props.setCurrentRoute('user');
    }
  }

  render() {
    let { tab, searching } = this.props

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
          { tab === 'USER_TAB' && <User /> }
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}

Tabs.propTypes = {
  switchTab: React.PropTypes.func.isRequired,
  tab: React.PropTypes.string.isRequired,
  searching: React.PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  tab: state.navigation.tab,
  searching: state.search.searching,
})

const mapActionsToProps = (dispatch) => ({
  toggleSessionModal: () => dispatch(toggleSessionModal(true)),
  switchTab: (tab) => dispatch(switchTab(tab)),
  cancelSearch: () => dispatch(cancelSearch()),
  scrollToTop: () => dispatch(scrollToTop('user')),
  setCurrentRoute: (route) => dispatch(setCurrentRoute(route)),
})

export default connect(mapStateToProps, mapActionsToProps)(Tabs)
