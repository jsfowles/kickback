'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Alert } from 'react-native';

import Container from '../shared/Container';
import SettingsGroup from './components/SettingsGroup';
import { destroySession } from '../../actions';

class Settings extends React.Component {
  settingsNavigation = () => {
    return [
      {
        title: 'Account',
        options: [
          { title: 'Edit Profile', onPress: () => Alert.alert('Coming Soon!', null, null), bordered: true },
          { title: 'Change Password', onPress: () => Alert.alert('Coming Soon!', null, null), bordered: false },
        ],
      },

      {
        title: 'Settings',
        options: [
          { title: 'Push Notification Settings', onPress: () => Alert.alert('Coming Soon!', null, null), bordered: true },
          { title: 'Deposit Settings', onPress: () => Alert.alert('Coming Soon!', null, null), bordered: false },
        ],
      },

      {
        title: 'About',
        options: [
          { title: 'Privacy Policy', onPress: () => this.props.navigator.push({ id: 5 }), bordered: true },
          { title: 'Terms', onPress: () => this.props.navigator.push({ id: 5 }), bordered: false },
        ],
      },

      {
        title: 'Support',
        options: [
          { title: 'Report a Problem', onPress: () => Alert.alert('Coming Soon!', null, null), bordered: false },
        ],
      },

      {
        options: [{
          title: 'Log Out',
          onPress: () => Alert.alert('Are you sure?', null, [
            { text: 'No', onPress: () => null },
            { text: 'Yes', onPress: () => this.props.logout() },
          ]),
          bordered: false,
        }],
      },
    ];
  }

  render() {
    let leftItem = {
      icon: require('image!back'),
      onPress: this.props.navigator.pop,
    };

    return (
      <Container
        leftItem={ leftItem }
        headerColors={[ '#45baef', '#34bcd5' ]}
        title={ 'Settings' }
      >
        <ScrollView
          style={{ marginBottom: 50, paddingTop: 25 }}
          showsVerticalScrollIndicator={ false }
        >
          { this.settingsNavigation().map((settingsGroup, i) => {
            return <SettingsGroup key={ i } { ...settingsGroup } />;
          })}
        </ScrollView>
      </Container>
    );
  }
}

Settings.propTypes = {
  navigator: React.PropTypes.shape({
    pop: React.PropTypes.func.isRequired,
    push: React.PropTypes.func.isRequired,
  }),
  logout: React.PropTypes.func.isRequired,
};

const mapStateToProps = _ => ({});

const mapActionsToProps = dispatch => ({
  logout: () => dispatch(destroySession()),
});

export default connect(mapStateToProps, mapActionsToProps)(Settings);
