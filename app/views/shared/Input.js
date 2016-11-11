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
    onChangeText: React.PropTypes.func,
    wrapperStyles: React.PropTypes.object.isRequired,
    setRef: React.PropTypes.func,
    secureTextEntry: React.PropTypes.bool,
  };

  static defaultProps = {
    autoCapitalize: 'none',
    autoCorrect: false,
    wrapperStyles: {},
  };

  render() {
    let {
      icon,
      wrapperStyles,
    } = this.props;

    return (
      <View style={[ styles.textInputContainer, wrapperStyles ]}>
        <View style={ styles.iconContainer }>
          <Image source={ icon } style={ styles.icon } />
        </View>

        <TextInput
          style={ styles.textInput }
          { ...this.props }
          ref={ this.props.setRef }
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
  },
});

export default Input;
