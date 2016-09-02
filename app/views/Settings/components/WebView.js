'use strict';
import React from 'react';
import { WebView } from 'react-native';

import Container from '../../shared/Container';

const SettingsWebView = ({ navigator, url, title }) => (
  <Container
    leftItem={{
      icon: require('image!back'),
      onPress: navigator.pop,
    }}
    headerColors={[ '#45baef', '#34bcd5' ]}
    title={ title }
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
