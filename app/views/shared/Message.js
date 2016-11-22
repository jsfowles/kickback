import React from 'react';
import { connect } from 'react-redux';
import { Animated, StyleSheet, Text, StatusBar } from 'react-native';
import { clearMessage } from '../../actions';


const COLORS = {
  error: '#EA2B3F',
  success: '#2FD2AF',
  neutral: '#CAD0D2',
};

class Message extends React.Component {
  static propTypes = {
    clearMessage: React.PropTypes.func.isRequired,
    message: React.PropTypes.shape({
      kind: React.PropTypes.string,
      message: React.PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.messagePosY = new Animated.Value(-36);
  }

  componentDidMount() {
    StatusBar.setHidden(true);

    if (this.props.message.kind !== 'neutral') {
      Animated.sequence([
        Animated.timing(
          this.messagePosY,
          { toValue: 0, duration: 500 },
        ),

        Animated.timing(
          this.messagePosY,
          { toValue: -36, duration: 500, delay: 2000 },
        ),
      ]).start(() => {
        StatusBar.setHidden(false);
        return this.props.clearMessage();
      });
    }
  }

  render() {
    return (
      <Animated.View style={[
        styles.container,
        { transform: [{ translateY: this.messagePosY }]},
        { backgroundColor: COLORS[this.props.message.kind] },
      ]}>
        <Text style={ styles.text }>{ this.props.message.message }</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 36,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#fff',
  },
});

const mapStateToProps = _ => ({});
const mapActionsToProps = dispatch => ({
  clearMessage: () => dispatch(clearMessage()),
});

export default connect(mapStateToProps, mapActionsToProps)(Message);
