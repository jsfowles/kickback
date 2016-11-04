'use strict';

import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';

import {
  toggleError,
  closeModal,
} from '../../actions';

import Navigation from '../Navigation';
import LoginContainer from './components/LoginContainer';
import ForgotPassword from './components/ForgotPassword';

const scenes = {
  login: <LoginContainer />,
  forgotPassword: <ForgotPassword />,
};

class Sessions extends React.Component {
  static propTypes = {
    tab: React.PropTypes.string.isRequired,
    toggleError: React.PropTypes.func.isRequired,
    closeModal: React.PropTypes.func.isRequired,
    navigation: React.PropTypes.object.isRequired,
  };

  render() {
    let { navigation } = this.props;

    return (
      <View style={styles.container}>

        <Navigation
          navigation={ navigation }
          scenes={ scenes }
        />

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
  navigation: state.navigation.session,
  tab: state.session.tab,
});

const mapActionsToProps = (dispatch) => ({
  toggleError: _ => dispatch(toggleError(false)),
  closeModal: _ => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapActionsToProps)(Sessions);
