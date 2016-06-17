'use strict';

import React from 'react';
import {
  Image,
  Animated,
  LayoutAnimation,
  Easing,
} from 'react-native';

class ProductImage extends React.Component {
  static propTypes = {
    imageUrl: React.PropTypes.string.isRequired,
    style: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      visibility: new Animated.Value(0),
    };
  }

  setVisibility = () => {
    Animated.timing(
      this.state.visibility,
      { toValue: 1 },
    ).start();
  }

  render() {
    let imageStyles = [ this.props.style, { opacity: this.state.visibility }]

    return (
      <Animated.Image
        style={ imageStyles }
        source={{ uri: this.props.imageUrl }}
        onLoad={ this.setVisibility }
      />
    );
  }
};


export default ProductImage
