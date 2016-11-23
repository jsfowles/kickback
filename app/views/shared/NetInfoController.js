import React from 'react';
import { connect } from 'react-redux';

import { NetInfo } from 'react-native';
import { connectionChanged } from '../../actions';

class NetInfoController extends React.Component {
  static propTypes = {
    connectionChanged: React.PropTypes.func.isRequired,
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().done(this.props.connectionChanged);
    NetInfo.isConnected.addEventListener('change', this.props.connectionChanged);
  }

  componentWillUnmount() {
    NetInfo.isConnected.addEventListener('change', this.props.connectionChanged);
  }

  render() {
    return null;
  }
}

const mapStateToProps = _ => ({ });

const mapActionsToProps = dispatch => ({
  connectionChanged: bool => dispatch(connectionChanged(bool)),
});

export default connect(mapStateToProps, mapActionsToProps)(NetInfoController);
