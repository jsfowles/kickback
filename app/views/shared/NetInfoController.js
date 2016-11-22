import React from 'react';
import { connect } from 'react-redux';

import {
  View,
  NetInfo,
} from 'react-native';

import {
  connectionChanged,
} from '../../actions';

class NetInfoController extends React.Component {
  state = {
    connectionInfoHistory: [],
  };

  componentDidMount() {
    NetInfo.addEventListener(
        'change',
        // this._handleConnectionInfoChange
    );
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(
        'change',
        // this._handleConnectionInfoChange
    );
  }

  render() {
    return (
        <View>
          <Text>{JSON.stringify(this.state.connectionInfoHistory)}</Text>
        </View>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
});

const mapActionsToProps = dispatch => ({
  connectionChanged: _ => dispatch(connectionChanged()),
});

export default connect(mapStateToProps, mapActionsToProps)(NetInfoController);
