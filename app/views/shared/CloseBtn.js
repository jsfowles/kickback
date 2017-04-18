import React from 'react';
import {
  TouchableHighlight,
  Image,
  StyleSheet,
} from 'react-native';

const CloseBtn = ({ onPress, color, style }) => (
  <TouchableHighlight
    style={ style }
    onPress={ onPress }
    underlayColor='transparent'
  >
    <Image
      source={ require('./assets/images/close.png') }
      style={{ tintColor: color }}
    />
  </TouchableHighlight>
);

CloseBtn.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  color: React.PropTypes.string.isRequired,
  style: React.PropTypes.number.isRequired,
};

CloseBtn.defaultProps = {
  color: '#6d7577',
};

export default CloseBtn;
