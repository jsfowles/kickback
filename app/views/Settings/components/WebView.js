'use strict';
import React from 'react';
import { WebView } from 'react-native';

import Container from '../../shared/Container';

const SettingsWebView = ({ handleNavigate, url, title }) => (
  <Container
    title={ title }
    headerColors={[ '#45baef', '#34bcd5' ]}
    leftItem={{
      icon: require('./assets/images/back.png'),
      onPress: () => handleNavigate({ type: 'pop' }),
    }}
  >
    <WebView source={{ uri: url }} />
  </Container>
);

SettingsWebView.propTypes = {
  navigator: React.PropTypes.shape({
    pop: React.PropTypes.func.isRequired,
  }),
  url: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
};

export default SettingsWebView;
