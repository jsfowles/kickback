'use strict';

import React from 'react';
import { TabBarIOS } from 'react-native';
import { connect } from 'react-redux';

import Profile from '../../Profile';
import Shopping from '../../Shopping';

import { onTabClick } from '../../../actions';

class Tabs extends React.Component {
  renderTab(tab) {
    switch (tab) {
      case 'shopping': return <Shopping />;
      case 'profile': return <Profile />;
      default: return null;
    }
  }

  renderChildren() {
    const { tabs, onTabClick } = this.props;

    return tabs.tabs.map((tab, i) => (
      <TabBarIOS.Item
        key={ tab.key }
        icon={ tab.icon }
        title=''
        selected={ tabs.index === i }
        onPress={ _ => onTabClick(i) }
      >
        { this.renderTab(tab.key) }
      </TabBarIOS.Item>
    ));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.modal) {
      nextProps.handleNavigate({ type: 'push', route: { key: nextProps.modal }});
    }

    if (this.props.modal && nextProps.modal === null) {
      nextProps.handleNavigate({ type: 'pop' });
    }
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
  onTabClick: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  tabs: state.tabs,
  modal: state.app.modal,
});

const mapActionsToProps = dispatch => ({
  onTabClick(index) { dispatch(onTabClick(index)); },
});

export default connect(mapStateToProps, mapActionsToProps)(Tabs);
