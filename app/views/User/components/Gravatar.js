import React from 'react';
import {
    StyleSheet,
    View,
    Image,
} from 'react-native';

import md5 from 'blueimp-md5';


const Gravatar = ({ emailAddress, style }) =>  {
  const GRAVATAR_URI = 'http://www.gravatar.com/avatar/';
  const uri = GRAVATAR_URI + md5(emailAddress);
  return <Image source={{uri}} style={[ styles.image, style ]} />;
};

Gravatar.propTypes = {
  ...View.PropTypes,
  emailAddress: React.PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  image: {
    height: 75,
    width: 75,
    backgroundColor: '#0e739f',
    borderWidth: 2,
    borderColor: '#ffffff',
    borderStyle: 'solid',
    borderRadius: 75 / 2,
  },
});

export default Gravatar;
