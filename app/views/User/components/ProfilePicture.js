'use strict';
import React from 'react';

import {
  Text,
  StyleSheet,
  Animated,
} from 'react-native';

const ProfilePicture = ({ user, animatedStyles }) => (
  <Animated.View style={[ styles.container, animatedStyles ]}>
    <Text style={ styles.profileText }>{ user.email }</Text>
  </Animated.View>
);

ProfilePicture.propTypes = {
  user: React.PropTypes.object,
  animatedStyles: React.PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 70,
    position: 'relative',
  },

  profilePicture: {
    marginBottom: 9,
  },

  profileText: {
    backgroundColor: 'transparent',
    color: '#0e739f',
    fontSize: 18,
  },
});

export default ProfilePicture;
