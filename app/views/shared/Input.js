import React from 'react';
import { View, Image, StyleSheet, TextInput } from 'react-native';

const Input = ({
  icon,
  placeholder,
  value,
  autoCapitalize,
  autoCorrect,
  onChangeText,
  wrapperStyles,
  secureTextEntry,
}) => (
  <View style={[ styles.textInputContainer, wrapperStyles ]}>
    <View style={ styles.iconContainer }>
      <Image source={ icon } style={[ styles.icon ]} />
    </View>

    <TextInput
      style={ styles.textInput }
      placeholder={ placeholder }
      value={ value }
      autoCapitalize={ autoCapitalize }
      autoCorrect={ autoCorrect }
      onChangeText={ onChangeText }
      secureTextEntry={ secureTextEntry }
      />
  </View>
);

Input.propTypes = {
  icon: React.PropTypes.object.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  autoCapitalize: React.PropTypes.string.isRequired,
  autoCorrect: React.PropTypes.bool.isRequired,
  onChangeText: React.PropTypes.func,
  wrapperStyles: React.PropTypes.object,
  secureTextEntry: React.PropTypes.object,
};

Input.defaultProps = {
  autoCapitalize: 'none',
  autoCorrect: false,
  wrapperStyles: {},
};

const styles = StyleSheet.create({
  textInputContainer: {
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
  },
});

export default Input;
