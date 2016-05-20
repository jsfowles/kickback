'use strict'
import React from 'react'
import { TabBarIOS, View, } from 'react-native'
import { connect } from 'react-redux'

import { switchTab } from '../../../actions/navigation'
import FeaturedProducts from '../../FeaturedProducts'
import User from '../../User'

const Tabs = ({
  Navigator,
  switchTab,
  tab,
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
      <FeaturedProducts />
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
}

const mapStateToProps = (state) => ({
  tab: state.navigation.tab,
})

const mapActionsToProps = (dispatch) => ({
  switchTab: (tab) => dispatch(switchTab(tab)),
})

export default connect(mapStateToProps, mapActionsToProps)(Tabs)
