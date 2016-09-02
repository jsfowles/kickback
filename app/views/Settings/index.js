'use strict';

import React from 'react';
import { ScrollView, Alert } from 'react-native';
import Container from '../shared/Container';
import SettingsGroup from './components/SettingsGroup';

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
          { title: 'Privacy Policy', onPress: () => Alert.alert('Coming Soon!', null, null), bordered: true },
          { title: 'Terms', onPress: () => Alert.alert('Coming Soon!', null, null), bordered: false },
        ],
      },

      {
        title: 'Support',
        options: [
          { title: 'Help Center', onPress: () => Alert.alert('Coming Soon!', null, null), bordered: true },
          { title: 'Report a Problem', onPress: () => Alert.alert('Coming Soon!', null, null), bordered: false },
        ],
      },

      {
        options: [
          { title: 'Log Out', onPress: () => Alert.alert('Coming Soon!', null, null), bordered: false },
        ],
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
  }),
};

export default Settings;
