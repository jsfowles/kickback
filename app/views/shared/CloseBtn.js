import React from 'react';
import {
  TouchableHighlight,
  Image,
  StyleSheet,
} from 'react-native';

const CloseBtn = ({ onPress, color }) => (
  <TouchableHighlight
    style={ styles.btn }
    onPress={ onPress }
    underlayColor='transparent'
  >
    <Image
      source={ require('image!close') }
      style={{ tintColor: color }}
    />
  </TouchableHighlight>
);

CloseBtn.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  color: React.PropTypes.string.isRequired,
};

CloseBtn.defaultProps = {
  color: '#ffffff',
};

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});

export default CloseBtn;
