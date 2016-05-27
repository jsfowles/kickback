'use strict'
import React from 'react'
import {
  Image,
  TouchableWithoutFeedback,
} from 'react-native'

const FeatureSearchSlide = ({
  dimensions,
  onPress,
  imageUrl,
  searchTerm,
}) => (
  <TouchableWithoutFeedback style={ dimensions } onPress={ () => onPress(searchTerm) }>
    <Image source={{ uri: imageUrl }} style={ dimensions } />
  </TouchableWithoutFeedback>
)

export default FeatureSearchSlide
