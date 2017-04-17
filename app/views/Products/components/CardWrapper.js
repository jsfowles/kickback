import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableWithoutFeedback } from 'react-native';

import {
  triggerProductModal,
  recommendProduct,
} from '../../../actions';

class CardWrapper extends React.Component {
  static propTypes = {
    product: React.PropTypes.shape({
      link: React.PropTypes.shape({
        shortenedUrl: React.PropTypes.string,
      }),
    }).isRequired,
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object,
    ]).isRequired,
    triggerProductModal: React.PropTypes.func.isRequired,
    recommendProduct: React.PropTypes.func.isRequired,
  };

  showProduct = () => {
    let {
      product,
      triggerProductModal,
      recommendProduct,
    } = this.props;

    if (product.link) {
      return triggerProductModal(product);
    }

    return recommendProduct(product);
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={ this.showProduct }
      >
        <View>{ this.props.children }</View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = _ => ({});

const mapActionsToProps = dispatch => ({
  triggerProductModal: product => dispatch(triggerProductModal(product)),
  recommendProduct: product => dispatch(recommendProduct(product, false)),
});

export default connect(mapStateToProps, mapActionsToProps)(CardWrapper);
