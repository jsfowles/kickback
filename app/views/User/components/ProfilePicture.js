'use strict';
import React from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';

const ProfilePicture = ({ user, animatedStyles }) => (
  <Animated.View style={[ styles.container, animatedStyles ]}>
    <View style={ styles.profilePicture }>
      <Image />
    </View>

    <Text style={ styles.profileText }>{ user.email }</Text>
  </Animated.View>
);

ProfilePicture.propTypes = {
  user: React.PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 70,
    position: 'relative',
  },

  profilePicture: {
    height: 75,
    width: 75,
    backgroundColor: '#0e739f',
    borderWidth: 2,
    borderColor: '#ffffff',
    borderStyle: 'solid',
    borderRadius: 75,
    marginBottom: 9,
  },

  profileText: {
    backgroundColor: 'transparent',
    color: '#0e739f',
    fontSize: 18,
  },
});

export default ProfilePicture;
