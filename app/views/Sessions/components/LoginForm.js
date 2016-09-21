'use strict';
import React from 'react';
import { connect } from 'react-redux';

import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Animated,
} from 'react-native';

import {
  changeSessionTab,
  fetchSession,
  updateSessionEmail,
} from '../../../actions';

const { width: deviceWidth } = Dimensions.get('window');

class LoginForm extends React.Component {
  static propTypes = {
    changeSessionTab: React.PropTypes.func.isRequired,
    tabs: React.PropTypes.object.isRequired,
    tabPosition: React.PropTypes.node,
    fetchSession: React.PropTypes.func.isRequired,
    updateSessionEmail: React.PropTypes.func.isRequired,
    email: React.PropTypes.string.isRequired,
  };

  render() {
    let {
      changeSessionTab,
      tabs,
      tabPosition,
      fetchSession,
      email,
      updateSessionEmail,
    } = this.props;

    return (
      <View style={[ styles.container, this.props.styles ]}>
        <View style={ styles.btnContainer }>
          <TouchableOpacity
            style={ styles.btn }
            onPress={ () => changeSessionTab(tabs.SIGN_UP) }
          >
            <Text style={ styles.btnText }>SIGN UP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ styles.btn }
            onPress={ () => changeSessionTab(tabs.LOG_IN) }
          >
            <Text style={ styles.btnText }>LOG IN</Text>
          </TouchableOpacity>

          <Animated.View
            style={[
              styles.borderBottom,
              { transform: [{
                translateX: tabPosition.interpolate({
                  inputRange: [ 0, 1 ],
                  outputRange: [ 0, deviceWidth / 2 ],
                }),
              }]},
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
          value={ email }
          onChangeText={ updateSessionEmail }
          onSubmitEditing={ _ => this.refs.password.focus() }
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
          onSubmitEditing={ fetchSession }
        />
      </View>
    );
  }
}

LoginForm.propTypes = {
  styles: React.PropTypes.object.isRequired,
};

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

const mapStateToProps = state => ({
  email: state.session.enteredEmail,
});

const mapActionsToProps = dispatch => ({
  changeSessionTab: tab => dispatch(changeSessionTab(tab)),
  fetchSession: e => dispatch(fetchSession(e.nativeEvent.text)),
  updateSessionEmail: v => dispatch(updateSessionEmail(v)),
});

export default connect(mapStateToProps, mapActionsToProps)(LoginForm);
