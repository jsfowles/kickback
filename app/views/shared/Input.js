import React from 'react';
import { View, Image, StyleSheet, TextInput } from 'react-native';

const Input = ({ icon, placeholder, value, autoCapitalize, autoCorrect, onChangeText }) => (
  <View style={ styles.textInputContainer }>
    <View style={ styles.iconContainer }>
      <Image source={ icon } style={ styles.icon } />
    </View>

    <TextInput
      style={ styles.textInput }
      placeholder={ placeholder }
      value={ value }
      autoCapitalize={ autoCapitalize }
      autoCorrect={ autoCorrect }
      onChangeText={ onChangeText}
      />
  </View>
);

Input.propTypes = {
  icon: React.PropTypes.object.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  autoCapitalize: React.PropTypes.string.isRequired,
  autoCorrect: React.PropTypes.string.isRequired,
  onChangeText: React.PropTypes.string.isRequired,
};

Input.defaultProps = {
  autoCapitalize: 'none',
  autoCorrect: false,
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
