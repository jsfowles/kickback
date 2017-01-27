'use strict';
import React from 'react';

import {
  Text,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';

const ProfilePicture = ({ user, animatedStyles }) => (
  <Animated.View style={[ styles.container, animatedStyles ]}>
    <Image
      style={styles.profilePicture}
      source={{ uri: user.avatarUrl }}
      />
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
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white',
    width: 80,
    height: 80,
  },

  profileText: {
    backgroundColor: 'transparent',
    color: '#0e739f',
    fontSize: 18,
  },
});

export default ProfilePicture;
