'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Alert } from 'react-native';

import Container from '../shared/Container';
import SettingsGroup from './components/SettingsGroup';
import {
  destroySession,
  updateUser,
  fetchUser,
} from '../../actions';

const ROUTES = {
  editProfile: {
    type: 'push',
    route: { key: 'editProfile' },
  },

  depositSettings: {
    type: 'push',
    route: { key: 'depositSettings' },
  },

  terms: {
    type: 'push',
    route: { key: 'terms' },
  },

  privacyPolicy: {
    type: 'push',
    route: { key: 'privacyPolicy' },
  },
};

class Settings extends React.Component {
  settingsNavigation = () => {
    let { handleNavigate } = this.props;
    return [
      {
        title: 'Account',
        options: [
          { title: 'Edit Profile',
            onPress: () => {
              this.props.fetchUser();
              return handleNavigate(ROUTES.editProfile);
            },
          bordered: true },
          { title: 'Change Password', onPress: () => Alert.alert('Coming Soon!', null, null), bordered: false },
        ],
      },

      {
        title: 'Settings',
        options: [
          { title: 'Push Notification Settings', onPress: () => Alert.alert('Coming Soon!', null, null), bordered: true },
          {
            title: 'Deposit Settings',
            onPress: () => {
              this.props.fetchUser();
              return handleNavigate(ROUTES.depositSettings);
            },
            bordered: false,
          },
        ],
      },

      {
        title: 'About',
        options: [
          { title: 'Privacy Policy', onPress: () => handleNavigate(ROUTES.privacyPolicy), bordered: true },
          { title: 'Terms', onPress: () => handleNavigate(ROUTES.terms), bordered: false },
        ],
      },

      {
        title: 'Support',
        options: [{
          title: 'Report a Problem',
          onPress: () => Alert.alert('Report a Problem', null, [
            { text: 'Spam or Abuse', onPress: () => handleNavigate({ id: 7, title: 'Feedback', reason: 'Spam or Abuse' }) },
            { text: 'Something isn\'t Working', onPress: () => handleNavigate({ id: 7, title: 'Feedback', reason: 'Something isn\'t Working' }) },
            { text: 'General Feedback', onPress: () => handleNavigate({ id: 7, title: 'Feedback', reason: 'General Feedback' }) },
            { text: 'Cancel', onPress: () => null },
          ]),
          bordered: false,
        }],
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
      onPress: () => this.props.handleNavigate({ type: 'pop' }),
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
  updateUser: React.PropTypes.func.isRequired,
  fetchUser: React.PropTypes.func.isRequired,
};

const mapStateToProps = _ => ({});

const mapActionsToProps = dispatch => ({
  logout: () => dispatch(destroySession()),
  updateUser: () => dispatch(updateUser()),
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapActionsToProps)(Settings);
