'use strict'
import React from 'react'
import { TabBarIOS, View, } from 'react-native'
import { connect } from 'react-redux'

import { switchTab } from '../../../actions/navigation'
import FeaturedProducts from '../../FeaturedProducts'
import User from '../../User'
import Search from '../../Search'
import ShoppingContainer from '../../shared/ShoppingContainer'

const Tabs = ({
  Navigator,
  switchTab,
  tab,
  searching,
}) => (
  <TabBarIOS
    tintColor='#3987d5'
    barTintColor='#fff'
    translucent={ false }
  >
    <TabBarIOS.Item
      icon={ require('image!cart') }
      title=''
      selected={ tab === 'FEATURED_TAB' }
      onPress={ () => switchTab('FEATURED_TAB') }
    >
      <ShoppingContainer>
        { !searching && <FeaturedProducts /> }
        { searching && <Search /> }
      </ShoppingContainer>
    </TabBarIOS.Item>

    <TabBarIOS.Item
      icon={ require('image!user') }
      title=''
      selected={ tab === 'USER_TAB' }
      onPress={ () => switchTab('USER_TAB') }
    >
      <User />
    </TabBarIOS.Item>
  </TabBarIOS>
)

Tabs.propTypes = {
  Navigator: React.PropTypes.object,
  switchTab: React.PropTypes.func.isRequired,
  tab: React.PropTypes.string.isRequired,
  searching: React.PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  tab: state.navigation.tab,
  searching: state.navigation.searching,
})

const mapActionsToProps = (dispatch) => ({
  switchTab: (tab) => dispatch(switchTab(tab)),
})

export default connect(mapStateToProps, mapActionsToProps)(Tabs)
