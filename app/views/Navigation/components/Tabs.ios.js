'use strict';

import React from 'react';
import { TabBarIOS } from 'react-native';
import { connect } from 'react-redux';

import Profile from '../../Profile';
import Shopping from '../../Shopping';

import { changeTab } from '../../../actions';

class Tabs extends React.Component {
  componentWillMount() {
    this.props.changeTab(0);
  }
  renderTab(tab) {
    switch (tab) {
    case 'shopping': return <Shopping />;
    case 'profile': return <Profile />;
    default: return null;
    }
  }

  onTabClick(index) {
    const { tabs, changeTab, currentUser } = this.props;

    if (tabs.index === index) { return null; }
    if (Object.keys(currentUser).length === 0) { return null; }

    changeTab(index);
  }

  renderChildren() {
    const { tabs } = this.props;

    return tabs.tabs.map((tab, i) => (
      <TabBarIOS.Item
        key={ tab.key }
        icon={ tab.icon }
        title=''
        selected={ tabs.index === i }
        onPress={ _ => this.onTabClick(i) }
      >
        { this.renderTab(tab.key) }
      </TabBarIOS.Item>
    ));
  }

  render() {
    return (
      <TabBarIOS
        tintColor='#3987d5'
        barTintColor='#fff'
        translucent={ false }
      >
        { this.renderChildren() }
      </TabBarIOS>
    );
  }
}

Tabs.propTypes = {
  tabs: React.PropTypes.shape({
    index: React.PropTypes.number.isRequired,
    tabs: React.PropTypes.array.isRequired,
  }),
  currentUser: React.PropTypes.shape({}),
  changeTab: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  tabs: state.tabs,
  currentUser: state.currentUser,
});

const mapActionsToProps = dispatch => ({
  changeTab(index) { dispatch(changeTab(index)); },
});

export default connect(mapStateToProps, mapActionsToProps)(Tabs);
