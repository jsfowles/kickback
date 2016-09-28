'use strict';
import React from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

const ProfilePicture = ({ user }) => (
  <View style={ styles.container }>
    <View style={ styles.profilePicture }>
      <Image />
    </View>

    <Text style={ styles.profileText }>{ user.email }</Text>
  </View>
);

ProfilePicture.propTypes = {
  user: React.PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 70,
  },

  profilePicture: {
    height: 75,
    width: 75,
    backgroundColor: '#ffffff',
    borderRadius: 75,
    marginBottom: 9,
  },

  profileText: {
    backgroundColor: 'transparent',
    color: '#0e739f',
  },
});

const mapStateToProps = state => ({
  user: state.user.user,
});

const mapActionsToProps = _ => ({});

export default connect(mapStateToProps, mapActionsToProps)(ProfilePicture);
