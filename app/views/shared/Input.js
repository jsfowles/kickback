import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';

class Input extends React.Component {
  static propTypes = {
    icon: React.PropTypes.object.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    autoCapitalize: React.PropTypes.string.isRequired,
    autoCorrect: React.PropTypes.bool.isRequired,
    onChangeText: React.PropTypes.func.isRequired,
    wrapperStyles: React.PropTypes.object.isRequired,
    refs: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    autoCapitalize: 'none',
    autoCorrect: false,
    wrapperStyles: {},
  };

  render() {
    let {
      icon,
      placeholder,
      value,
      autoCapitalize,
      autoCorrect,
      onChangeText,
      wrapperStyles,
      refs,
    } = this.props;

    return (
      <View style={[ styles.textInputContainer, wrapperStyles ]}>
        <View style={ styles.iconContainer }>
          <Image source={ icon } style={ styles.icon } />
        </View>

        <TextInput
          style={ styles.textInput }
          placeholder={ placeholder }
          value={ value }
          autoCapitalize={ autoCapitalize }
          autoCorrect={ autoCorrect }
          onChangeText={ onChangeText }
          refs={ refs }
        />
      </View>
    );
  }
}

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
    height: 22,
    width: 22,
  },
});

export default Input;
