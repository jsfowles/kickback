'use strict'
import React from 'react'
import { TabBarIOS, View, } from 'react-native'
import { connect } from 'react-redux'

import { switchTab, cancelSearch } from '../../../actions'
import User from '../../User'
import Shopping from '../../Shopping'

class Tabs extends React.Component {
  switchTab = (tab) => {
    let { switchTab, searching, cancelSearch } = this.props

    if (tab === 'SHOPPING_TAB' && searching) {
      cancelSearch()
    } else {
      switchTab(tab)
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
  switchTab: (tab) => dispatch(switchTab(tab)),
  cancelSearch: () => dispatch(cancelSearch()),
})

export default connect(mapStateToProps, mapActionsToProps)(Tabs)
