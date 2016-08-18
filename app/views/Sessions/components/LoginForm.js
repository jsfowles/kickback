'use strict';
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Animated,
} from 'react-native';

const FORM_HEIGHT = 101; // this is the height of the 2 inputs + the separator

const {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window')

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

  // TODO (Riley): We could probably move the btn's to outside this component,
  //               for right now I am in shipit mode.
  render() {
    let { changeTab, tabs, tabPosition, } = this.props;

    return (
      <View style={[ styles.container, this.props.styles ]}>
        <View style={ styles.btnContainer }>
          <TouchableOpacity
            style={ styles.btn }
            onPress={ () => changeTab(tabs.SIGN_UP) }
          >
            <Text style={ styles.btnText }>SIGN UP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ styles.btn }
            onPress={ () => changeTab(tabs.LOG_IN) }
          >
            <Text style={ styles.btnText }>LOG IN</Text>
          </TouchableOpacity>

          <Animated.View
            style={[
              styles.borderBottom,
              { transform: [{
                translateX: tabPosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, deviceWidth / 2]
                }),
              }]}
            ]}
          />
        </View>

        <TextInput
          style={ styles.textInput }
          placeholder='Enter your email'
          autoCapitalize={ 'none' }
          autoCorrect={ false }
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
  styles: React.PropTypes.object.isRequired,
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    position: 'relative',
  },

  textInput: {
    height: 50,
    backgroundColor: '#fff',
  },

  separator: {
    height: 1,
    backgroundColor: '#ececec',
  },

  btnContainer: {
    position: 'absolute',
    top: -57,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },

  btn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },

  btnText: {
    color: '#fff',
    backgroundColor: 'transparent',
    fontWeight: '700',
  },

  borderBottom: {
    height: 5,
    backgroundColor: '#f7f8f9',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: deviceWidth / 2,
  },
});

export default LoginForm;
