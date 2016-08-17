'use strict';

import React from 'react';
import {
  View,
  Modal,
  Dimensions,
  StyleSheet,
  DeviceEventEmitter,
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
      keyboardHeight: 216,
    };
  }

  componentWillMount() {
    this.keyboardWillShow = DeviceEventEmitter.addListener('keyboardWillShow', e => {
      this.setState({ keyboardHeight: e.endCoordinates.height });
    });
  }

  componentWillUnmount() {
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
          <Header closeModal={ this.props.toggleSessionModal } />

          <LoginForm
            keyboardHeight={ this.state.keyboardHeight }
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
