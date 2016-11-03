'use strict';

import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  Animated,
} from 'react-native';

import { connect } from 'react-redux';

import {
  toggleError,
  closeModal,
} from '../../actions';

import LoginForm from './components/LoginForm';
import Header from './components/Header';
import BottomLink from '../shared/BottomLink';
import BGVideo from './components/BGVideo';
import Errors from '../shared/Errors';

const { height: deviceHeight } = Dimensions.get('window');

const TABS = {
  SIGN_UP: 'SIGN_UP',
  LOG_IN: 'LOG_IN',
};

class Sessions extends React.Component {
  static propTypes = {
    tab: React.PropTypes.string.isRequired,
    toggleError: React.PropTypes.func.isRequired,
    closeModal: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    let tabPosition = props.tab === 'SIGN_UP' ? 0 : 1;

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

      this.setState({ loginFormStyles, headerStyles, showResetPassword: true });
    });

    this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', e => {
      let keyboardHeight = e.endCoordinates.height;
      let headerHeight = deviceHeight - (101 + keyboardHeight);

      Animated.timing(
        this.state.vidHeight,
        { toValue: headerHeight, duration: 250 },
      ).start();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tab !== nextProps.tab) {
      let toValue = 0;
      if (nextProps.tab === TABS.LOG_IN) { toValue = 1; }
      Animated.timing( this.state.tabPosition, { toValue }).start();
    }
  }

  componentWillUnmount() {
    this.keyboardDidShow.remove();
    this.keyboardWillShow.remove();
  }

  render() {
    let { closeModal } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={ true } />
        <KeyboardAvoidingView behavior='padding' style={ styles.container }>
          <BGVideo
            tabPosition={ this.state.tabPosition }
            vidHeight={ this.state.vidHeight }
          />

          <Header
            style={ this.state.headerStyles }
            closeModal={ closeModal }
          />

          <LoginForm
            tabs={ TABS }
            styles={ this.state.loginFormStyles }
            tabPosition={ this.state.tabPosition }
          />

          <Errors message={ 'Invalid email or password' } position={ this.state.errorPosition } />
        </KeyboardAvoidingView>

        { this.state.showResetPassword && <BottomLink
          title='Forgot your Password?'
          containerStyles={ styles.btnContainer }
          onPress={ () => null }
        /> }
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },

  btnContainer: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const mapStateToProps = (state) => ({
  tab: state.session.tab,
});

const mapActionsToProps = (dispatch) => ({
  toggleError: _ => dispatch(toggleError(false)),
  closeModal: _ => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapActionsToProps)(Sessions);
