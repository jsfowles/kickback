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
  TouchableWithoutFeedback,
} from 'react-native';

import { connect } from 'react-redux';

import {
  createSession,
  toggleSessionModal,
} from '../../actions';

import LoginForm from './components/LoginForm';
import Header from './components/Header';

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

    this.state = {
      loginFormStyles: {},
      headerStyles: {},
    };
  }

  componentWillMount() {
    this.keyboardWillShow = Keyboard.addListener('keyboardDidShow', e => {
      let keyboardHeight = e.endCoordinates.height;

      let loginFormStyles = {
        paddingBottom: keyboardHeight,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 101 + keyboardHeight,
      };

      let headerStyles = {
        height: deviceHeight - (101 + keyboardHeight),
        flex: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      };

      this.setState({ loginFormStyles, headerStyles });
    });
  }

  componentWillUnmount() {
    this.keyboardDidShow.remove()
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
          <Header closeModal={ this.props.toggleSessionModal } style={ this.state.headerStyles } />

          <LoginForm
            styles={ this.state.loginFormStyles }
            login={ this.props.createSession }
          />
        </KeyboardAvoidingView>
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
