'use strict';

import React from 'react';
import {
  View,
  Modal,
  Dimensions,
  StyleSheet,
  DeviceEventEmitter,
  StatusBar,
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
        <View style={ styles.container }>
          <Header closeModal={ this.props.toggleSessionModal } />

          <LoginForm
            keyboardHeight={ this.state.keyboardHeight }
            login={ this.props.createSession }
          />
        </View>
      </Modal>
    );
  }
};

let styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: deviceHeight,
    width: deviceWidth,
  },
});

const mapStateToProps = (state) => ({});

const mapActionsToProps = (dispatch) => ({
  createSession: (credentials) => dispatch(createSession(credentials)),
  toggleSessionModal: () => dispatch(toggleSessionModal(false)),
});

export default connect(mapStateToProps, mapActionsToProps)(Sessions);
