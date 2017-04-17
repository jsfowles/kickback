'use strict';
import React from 'react';
import { connect } from 'react-redux';

import {
  Text,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';

const ProfilePicture = ({ email, avatarUrl, animatedStyles }) => (
  <Animated.View style={[ styles.container, animatedStyles ]}>
    <Image
      style={styles.profilePicture}
      source={{ uri: avatarUrl }}
    />
    <Text style={ styles.profileText }>{ email }</Text>
  </Animated.View>
);

ProfilePicture.propTypes = {
  email: React.PropTypes.string,
  avatarUrl: React.PropTypes.string,
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

const mapStateToProps = state => ({
  email: state.user.user.email, // TODO: (js) if user.user is undefined we will crash, is this possible?
  avatarUrl: state.user.user.avatarUrl,
});

export default connect(mapStateToProps)(ProfilePicture);
