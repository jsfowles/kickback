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
  changeForm,
} from '../../actions';

import LoginForm from './components/LoginForm';
import Header from './components/Header';
import ResetPasswordLink from './components/ResetPasswordLink';
import BGVideo from './components/BGVideo';

const {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window')

class Sessions extends React.Component {
  static propTypes = {
    modalVisible: React.PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    let tabPosition = props.currentTab === 'SIGN_UP' ? 0 : 1;

    this.state = {
      loginFormStyles: {},
      headerStyles: {},
      showResetPassword: false,
      vidHeight: new Animated.Value(deviceHeight),
      tabPosition: new Animated.Value(tabPosition),
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

          <Header
            closeModal={ this.props.toggleSessionModal }
            style={ this.state.headerStyles }
          />

          <LoginForm
            styles={ this.state.loginFormStyles }
            login={ this.props.createSession }
            changeTab={ this.props.changeForm }
            tabPosition={ this.state.tabPosition }
            tabs={ this.props.tabs }
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

const mapStateToProps = (state) => ({
  tabs: state.session.tabs,
  currentTab: state.session.currentTab,
});

const mapActionsToProps = (dispatch) => ({
  createSession: (credentials) => dispatch(createSession(credentials)),
  toggleSessionModal: _ => dispatch(toggleSessionModal(false)),
  changeForm: tab => dispatch(changeForm(tab)),
});

export default connect(mapStateToProps, mapActionsToProps)(Sessions);
