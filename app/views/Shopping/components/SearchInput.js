'use strict'
import React from 'react'
import {
  Image,
  TextInput,
  StyleSheet,
  Animated
} from 'react-native'

const SearchInput = ({
  buttonPosX,
  inputStyles,
  buttonWidth,
  updateSearchTerm,
  value,
  search,
}) => {
  return (
    <Animated.View style={{
      position: 'relative',
      width: buttonWidth,
      transform: [{ translateX: buttonPosX },
    ]}}>
      <Image source={ require('image!search') } style={{ position: 'absolute', top: 8, left: 8 }} />
      <TextInput
        value={ value }
        style={[ inputStyles, styles.input ]}
        placeholder='Search'
        placeholderTextColor='rgba(255, 255, 255, 0.75)'
        selectionColor='#fff'
        clearButtonMode='while-editing'
        enablesReturnKeyAutomatically={ true }
        returnKeyType='search'
        autoFocus={ true }
        onChangeText={ updateSearchTerm }
        onSubmitEditing={ search }
      />
    </Animated.View>
  );
};

SearchInput.propTypes = {
  buttonPosX: React.PropTypes.object.isRequired,
  inputStyles: React.PropTypes.number.isRequired,
  buttonWidth: React.PropTypes.object.isRequired,
  updateSearchTerm: React.PropTypes.func.isRequired,
  search: React.PropTypes.func.isRequired,
  value: React.PropTypes.string,
};

const styles = StyleSheet.create({
  input: {
    color: '#fff',
    paddingLeft: 28,
  },

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingLeft: 13,
  },
})

export default SearchInput
