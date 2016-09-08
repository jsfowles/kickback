'use strict';

import React from 'react';
import {
  View,
  Modal,
  Dimensions,
  StyleSheet,
  Keyboard,
  StatusBar,
  KeyboardAvoidingView,
  Animated,
  Easing,
} from 'react-native';

import { connect } from 'react-redux';

import {
  createSession,
  toggleSessionModal,
  changeForm,
  submitForm,
  updateUsername,
  toggleError,
} from '../../actions';

import LoginForm from './components/LoginForm';
import Header from './components/Header';
import ResetPasswordLink from './components/ResetPasswordLink';
import BGVideo from './components/BGVideo';
import Errors from '../shared/Errors';

const {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window')

class Sessions extends React.Component {
  constructor(props) {
    super(props);

    let tabPosition = props.currentTab === 'SIGN_UP' ? 0 : 1;

    this.state = {
      loginFormStyles: {},
      headerStyles: {},
      showResetPassword: false,
      vidHeight: new Animated.Value(deviceHeight),
      tabPosition: new Animated.Value(tabPosition),
      errorPosition: new Animated.Value(0),
    };
  }

  componentWillMount() {
    this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', e => {
      let keyboardHeight = e.endCoordinates.height;
      let headerHeight = deviceHeight - (101 + keyboardHeight);

      let loginFormStyles = {
        paddingBottom: keyboardHeight,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 101 + keyboardHeight,
      };

      let headerStyles = {
        height: headerHeight,
        flex: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      };

      this.setState({ loginFormStyles, headerStyles, showResetPassword: true, });
    });

    this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', e => {
      let keyboardHeight = e.endCoordinates.height;
      let headerHeight = deviceHeight - (101 + keyboardHeight);

      Animated.timing(
        this.state.vidHeight,
        { toValue: headerHeight }
      ).start();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentTab !== nextProps.currentTab) {
      let toValue = 0;
      if (nextProps.currentTab == this.props.tabs.LOG_IN) { toValue = 1; }
      Animated.timing( this.state.tabPosition, { toValue }).start()
    }

    if (!this.props.showError && nextProps.showError) {
      Animated.sequence([
        Animated.timing(this.state.errorPosition, {
          toValue: 1,
          duration: 500,
          easing: Easing.bezier(0.25, 1, 0.25, 1)
        }),
        Animated.delay(1000),
        Animated.timing( this.state.errorPosition, {
          toValue: 0,
          duration: 500,
          easing: Easing.bezier(0.25, 1, 0.25, 1)
        }),
      ]).start(() => this.props.toggleError());
    }
  }

  componentWillUnmount() {
    this.keyboardDidShow.remove();
    this.keyboardWillShow.remove();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior='padding' style={ styles.container }>
          <BGVideo
            tabPosition={ this.state.tabPosition }
            vidHeight={ this.state.vidHeight }
          />

          <Header
            closeModal={ this.props.navigator.pop }
            style={ this.state.headerStyles }
          />

          <LoginForm
            styles={ this.state.loginFormStyles }
            login={ this.props.createSession }
            changeTab={ this.props.changeForm }
            tabPosition={ this.state.tabPosition }
            submitForm={ this.props.submitForm }
            tabs={ this.props.tabs }
            updateUsername={ this.props.updateUsername }
            email={ this.props.username }
          />

          <Errors message={ 'Invalid email or password' } position={ this.state.errorPosition } />
        </KeyboardAvoidingView>

        { this.state.showResetPassword && <ResetPasswordLink /> }
      </View>
    );
  }
};

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#ececec',
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

const mapStateToProps = (state) => ({
  tabs: state.session.tabs,
  currentTab: state.session.currentTab,
  username: state.session.username,
  showError: state.session.showError,
});

const mapActionsToProps = (dispatch) => ({
  createSession: (credentials) => dispatch(createSession(credentials)),
  toggleSessionModal: _ => dispatch(toggleSessionModal(false)),
  changeForm: tab => dispatch(changeForm(tab)),
  updateUsername: v => dispatch(updateUsername(v)),
  submitForm: e => dispatch(submitForm(e.nativeEvent.text)),
  toggleError: _ => dispatch(toggleError(false)),
});

  export default connect(mapStateToProps, mapActionsToProps)(Sessions);
