'use strict';

import React from 'react';
import {
  View,
  Modal,
  TouchableHighlight,
  Text,
  Dimensions,
} from 'react-native';

import { connect } from 'react-redux';
import { createSession } from '../../actions';

const {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window')

class Sessions extends React.Component {
  static propTypes = {
    modalVisible: React.PropTypes.bool.isRequired,
  }

  render() {
    return (
      <Modal
        visible={ this.props.modalVisible }
        animationType='slide'
        transparent={ false }
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: deviceHeight,
            width: deviceWidth,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableHighlight
            onPress={ this.props.createSession }
          >
            <Text>Log In</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    );
  }
};

const mapStateToProps = (state) => ({  })
const mapActionsToProps = (dispatch) => ({
  createSession: () => dispatch(createSession()),
})

export default connect(mapStateToProps, mapActionsToProps)(Sessions)
