import React from 'react';
import { connect } from 'react-redux';

import LargeCard from './CardLarge';
import SmallCard from './CardSmall';
import CardFooter from './CardFooter';
import CardFooterShared from './CardFooterShared';
import { recommendProduct } from '../../../actions';

class CardContainer extends React.Component {
  static propTypes = {
    product: React.PropTypes.shape({
      id: React.PropTypes.number,
      link: React.PropTypes.object,
    }).isRequired,
    cardSize: React.PropTypes.string,
    recommendProduct: React.PropTypes.func,
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.product.id !== this.props.product.id) {
      return true;
    }

    return false;
  }

  renderFooter = () => {
    const { product, recommendProduct } = this.props;
    const props = {
      kickback: product.kickback,
      recommendProduct: () => recommendProduct(product),
      link: product.link ? product.link : null,
    };

    if (product.link) {
      return <CardFooterShared { ...props } />;
    }

    return <CardFooter { ...props } />;
  }

  render() {
    const { cardSize, product } = this.props;
    const content = cardSize === 'large' ? <LargeCard/> : <SmallCard />;

    return React.cloneElement(
      content,
      { product },
      this.renderFooter()
    );
  }
}

const mapStateToProps = _ => ({});
const mapActionsToProps = dispatch => ({
  recommendProduct: product => dispatch(recommendProduct(product)),
});

export default connect(mapStateToProps, mapActionsToProps)(CardContainer);
