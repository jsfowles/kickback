import React from 'react';
import { View, Image, StyleSheet, TextInput } from 'react-native';

const Input = ({ icon }) => (
  <View style={ styles.textInputContainer }>
    <View style={ styles.iconContainer }>
      <Image source={ icon } style={ styles.icon } />
    </View>

    <TextInput style={ styles.textInput } />
  </View>
);

Input.propTypes = {
  icon: React.PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  textInput: {
    height: 50,
    flex: 1,
  },

  iconContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    tintColor: '#bdc1c9',
    height: 22,
    width: 22,
  },
});

export default Input;
