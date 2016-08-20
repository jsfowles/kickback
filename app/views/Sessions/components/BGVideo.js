'use strict';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

import Video from 'react-native-video';

const {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window')

class BGVideo extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  onLoad = () => {
    console.log('onLoad')
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          { height: this.props.vidHeight },
          { transform: [{
            translateX: this.props.tabPosition.interpolate({
              inputRange: [0, 1],
              outputRange: [10, 30],
            }),
          }]}
        ]}
      >
        <Video
          source={{ uri: 'https://s3.amazonaws.com/kickback-app/static/login/login-clip.mp4' }}
          rate={ 1.0 }
          muted={ true }
          paused={ false }
          resizeMode="cover"
          repeat={ true }
          playInBackground={ false }
          playWhenInactive={ false }
          style={ styles.video }
          onLoad={ this.onLoad  }
        />
      </Animated.View>
    );
  }
};

let styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: -30,
    width: deviceWidth + 40,
  },

  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default BGVideo;
