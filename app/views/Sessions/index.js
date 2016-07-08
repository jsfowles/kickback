'use strict';

import React from 'react';
import {
  View,
  Modal,
  TextInput,
  Dimensions,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';

import { connect } from 'react-redux';
import { createSession } from '../../actions';
import LoginForm from './components/LoginForm';

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
      keyboardHeight: 226,
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
    return (
      <Modal
        visible={ this.props.modalVisible }
        animationType='slide'
        transparent={ false }
      >
        <View style={ styles.container }>
          <View style={ styles.header }>
          </View>

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

  header: {
    backgroundColor: '#ececec',
    flex: 1,
  },
});

const mapStateToProps = (state) => ({  })

const mapActionsToProps = (dispatch) => ({
  createSession: (credentials) => dispatch(createSession(credentials)),
})

export default connect(mapStateToProps, mapActionsToProps)(Sessions)
