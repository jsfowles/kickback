'use strict';
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const FORM_HEIGHT = 101; // this is the height of the 2 inputs + the separator

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'hello@underbelly.is',
      password: 'password',
    };
  }

  focusNextField = () => this.refs.password.focus();
  submitForm = () => this.props.login(this.state);

  render() {
    let { keyboardHeight } = this.props;

    return (
      <View style={[ styles.container, { height: keyboardHeight + FORM_HEIGHT, paddingBottom: keyboardHeight }]}>
        <TextInput
          style={ styles.textInput }
          placeholder='Enter your email'
          autoCapitalize={ 'none' }
          autoCorrect={ false }
          autoFocus={ true }
          keyboardType={ 'email-address' }
          textAlign={ 'center' }
          returnKeyType={ 'next' }
          ref={ 'email' }
          value={ this.state.email }
          onSubmitEditing={ this.focusNextField }
          onChangeText={ email => this.setState({ email }) }
        />

        <View style={ styles.separator } />

        <TextInput
          style={ styles.textInput }
          placeholder='Enter your password'
          autoCapitalize={ 'none' }
          autoCorrect={ false }
          secureTextEntry={ true }
          textAlign={ 'center' }
          returnKeyType={ 'go' }
          ref={ 'password' }
          value={ this.state.password }
          onSubmitEditing={ this.submitForm }
          onChangeText={ password => this.setState({ password }) }
        />
      </View>
    );
  }
};

LoginForm.propTypes = {
  keyboardHeight: React.PropTypes.number.isRequired,
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },

  textInput: {
    height: 50,
  },

  separator: {
    height: 1,
    backgroundColor: '#ececec',
  },
});

export default LoginForm;
