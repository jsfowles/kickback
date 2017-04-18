import React from 'react';
import { connect } from 'react-redux';
import {
  WebView,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {
  closeModal,
  recommendProduct,
} from '../../../actions';

const {
  height: HEIGHT,
  width: WIDTH,
} = Dimensions.get('window')

import Container from '../../shared/Container';

class ProductModal extends React.Component {
  static propTypes = {
    closeModal: React.PropTypes.func.isRequired,
    recommendProduct: React.PropTypes.func.isRequired,
    product: React.PropTypes.shape({
      link: React.PropTypes.shape({
        shortenedUrl: React.PropTypes.string,
      }),
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  onLoad = () => {
    this.setState({ loading: false });
  }

  render() {
    const { closeModal, recommendProduct, product } = this.props;

    return (
      <Container
        headerColors={[ '#45baef', '#34bcd5' ]}
        title={ `http://${product.link.shortenedUrl}` }
        leftItem={{
          icon: require('./assets/images/close.png'),
          onPress: closeModal,
        }}
        rightItem={{
          icon: require('./assets/images/share.png'),
          onPress: () => recommendProduct(product),
        }}
      >
        <WebView
          source={{ uri: `http://${product.link.shortenedUrl}` }}
          onLoad={ this.onLoad }
          style={{ opacity: this.state.loading ? 0 : 1 }}
        />

        { this.state.loading && <ActivityIndicator size='large' style={ styles.centering } /> }
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  centering: {
    position: 'absolute',
    top: HEIGHT / 2 - 40,
    left: WIDTH / 2 - 40,
    width: 80,
    height: 80,
  },
});

const mapStateToProps = state => ({
  product: state.app.productModal,
});

const mapActionsToProps = dispatch => ({
  closeModal: _ => dispatch(closeModal()),
  recommendProduct: product => dispatch(recommendProduct(product)),
});

export default connect(mapStateToProps, mapActionsToProps)(ProductModal);
