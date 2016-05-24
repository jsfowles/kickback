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
}) => (
  <TouchableWithoutFeedback style={ dimensions } onPress={ onPress }>
    <Image source={{ uri: imageUrl }} style={ dimensions } />
  </TouchableWithoutFeedback>
)

export default FeatureSearchSlide
