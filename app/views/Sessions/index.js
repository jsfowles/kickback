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
} from 'react-native';

import { connect } from 'react-redux';

import {
  createSession,
  toggleSessionModal,
} from '../../actions';

import LoginForm from './components/LoginForm';
import Header from './components/Header';
import ResetPasswordLink from './components/ResetPasswordLink';
import BGVideo from './components/BGVideo';

const {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window')

const tabs = {
  SIGN_UP: 'SIGN_UP',
  LOG_IN: 'LOG_IN',
};

class Sessions extends React.Component {
  static propTypes = {
    modalVisible: React.PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      loginFormStyles: {},
      headerStyles: {},
      showResetPassword: false,
      vidHeight: new Animated.Value(deviceHeight),
      tabPosition: new Animated.Value(0),
      currentTab: tabs['SIGN_UP'],
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

  changeTab = (tab) => {
    let toValue = 0;

    if (tab !== tabs[this.state.currentTab]) {
      if (tab == tabs.LOG_IN) { toValue = 1; }

      this.setState(
        { currentTab: tabs[tab] },
        Animated.timing( this.state.tabPosition, { toValue }).start()
      );
    }
  }

  componentWillUnmount() {
    this.keyboardDidShow.remove()
    this.keyboardWillShow.remove()
  }

  render() {
    StatusBar.setHidden(this.props.modalVisible, true);

    return (
      <Modal
        visible={ this.props.modalVisible }
        animationType='slide'
        transparent={ false }
      >
        <KeyboardAvoidingView behavior='padding' style={ styles.container }>
          <BGVideo
            tabPosition={ this.state.tabPosition }
            vidHeight={ this.state.vidHeight }
          />
          <Header closeModal={ this.props.toggleSessionModal } style={ this.state.headerStyles } />

          <LoginForm
            styles={ this.state.loginFormStyles }
            login={ this.props.createSession }
            changeTab={ this.changeTab }
            tabPosition={ this.state.tabPosition }
            tabs={ tabs }
          />
        </KeyboardAvoidingView>

        { this.state.showResetPassword && <ResetPasswordLink /> }
      </Modal>
    );
  }
};

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#ececec',
    flex: 1,
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => ({});

const mapActionsToProps = (dispatch) => ({
  createSession: (credentials) => dispatch(createSession(credentials)),
  toggleSessionModal: () => dispatch(toggleSessionModal(false)),
});

export default connect(mapStateToProps, mapActionsToProps)(Sessions);
