'use strict';

import React from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {
  height: deviceHeight,
  width: deviceWidth,
} = Dimensions.get('window');

/**
 * ________________________________________
 * |             ⚲ SEARCH                 |
 * ________________________________________
 *
 * Description: This is the search button component. When Clicked the text
 *              and icon should move to the left. Depending on the state
 *              of the button the offset of center is different.
 */
const SearchBtn = ({
  onPress,
  buttonStyles,
  buttonWidth,
  buttonPosX,
  onLayout,
  textPosX,
  placeholder,
}) => (
  <Animated.View style={{
    width: buttonWidth,
    transform: [{ translateX: buttonPosX }],
  }}>
    <TouchableOpacity style={ buttonStyles } onPress={ onPress } activeOpacity={ 1 }>
      <Animated.View
        style={[
          styles.textContainer,
          { transform: [{ translateX: textPosX }] },
        ]}
      >
        <Image
          source={ require('./assets/images/search.png') }
          style={{ marginRight: 5 }}
          onLayout={ (e) => onLayout(e, 'searchIconLayout') }
        />
        <Text
          style={ styles.buttonText }
          onLayout={ (e) => onLayout(e, 'searchTextLayout') }
        >
          { placeholder }
        </Text>
      </Animated.View>
    </TouchableOpacity>
  </Animated.View>
);

SearchBtn.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  onLayout: React.PropTypes.func.isRequired,
  buttonStyles: React.PropTypes.number.isRequired,
  buttonWidth: React.PropTypes.object.isRequired,
  buttonPosX: React.PropTypes.object.isRequired,
  textPosX: React.PropTypes.object.isRequired,
  placeholder: React.PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    lineHeight: 29,
    fontSize: 16,
  },
});

export default SearchBtn;
