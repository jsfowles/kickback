import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const CancelBtn = ({ onPress, onLayout, posX }) => (
  <TouchableOpacity
    style={{ transform: [{ translateX: posX }], height: 30 }}
    onPress={ onPress }
    onLayout={ (e) => onLayout(e, 'cancelLayout') }
  >
    <Text style={ styles.cancelText }>Cancel</Text>
  </TouchableOpacity>
);

CancelBtn.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  onLayout: React.PropTypes.func.isRequired,
  posX: React.PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  cancelText: {
    color: '#fff',
    marginLeft: 10,
    lineHeight: 30,
  },
});

export default CancelBtn;
