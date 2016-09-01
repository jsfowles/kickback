'use strict';

import React from 'react';
import { View } from 'react-native';
import Container from '../shared/Container';

class Settings extends React.Component {
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
        <View />
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
