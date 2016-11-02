import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';

const BackBtn = ({
  btnSize,
  backButtonPosX,
  onBackPress,
}) => (
  <Animated.View
    style={[
      { transform: [{ translateX: backButtonPosX }], width: btnSize },
      styles.backBtnContainer,
    ]}
  >
    <TouchableOpacity style={ styles.backBtn } onPress={ onBackPress }>
      <Image source={ require('image!back') } />
    </TouchableOpacity>
  </Animated.View>
);

BackBtn.propTypes = {
  btnSize: React.PropTypes.number.isRequired,
  backButtonPosX: React.PropTypes.object.isRequired,
  onBackPress: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  backBtnContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 30,
  },

  backBtn: {
    height: 30,
    justifyContent: 'center',
  },
});

export default BackBtn;
