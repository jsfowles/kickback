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
 * Description: This is the search button component. When Clicked the text and icon should
 *              move to the left. Depending on the state of the button the offset of center
 *              is different.
 */
class SearchBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonWidth: 0,
      textWidth: 0,
    };
  }

  onLayout = (e, context) => {
    let { x, y, width, height } = e.nativeEvent.layout;
    this.setState({ [`${context}Width`]: width });
  }

  render() {
    let halfContainer = deviceWidth * 0.5;
    let halfText = this.state.textWidth * 0.5;
    let leftOffset = this.props.route === 'search' ? 31 : 10
    let textPosition = { left: halfContainer - leftOffset, transform: [{ translateX: (-halfText) }]};

    return (
      <TouchableOpacity
        style={ this.props.style }
        activeOpacity={ 1 }
        onPress={ this.props.toggleSearchOverlay }
      >
        <View
          style={ styles.buttonOuterContainer }
          onLayout={ (e) => this.onLayout(e, 'button') }
        >
          <Animated.View
            style={[ styles.buttonInnerContainer, textPosition ]}
            onLayout={ (e) => this.onLayout(e, 'text') }
          >
            <Image source={ require('image!search') } />
            <Text style={ styles.buttonText }>{ this.props.placeholder }</Text>
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  buttonOuterContainer: {
    flex: 1,
    position: 'relative',
  },

  buttonInnerContainer: {
    flexDirection: 'row',
    position: 'absolute',
    height: 30,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    marginLeft: 5,
  },
});

export default SearchBtn;
