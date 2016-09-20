'use strict'

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableWithoutFeedback,
} from 'react-native'

import ProductCard from './components/CardContainer'
import { makeStandard } from '../../utils/product'

const defaultProps = {
  headerHeight: 0,
};

const propTypes = {
  products: React.PropTypes.array.isRequired,
  loadMoreProducts: React.PropTypes.func,
  title: React.PropTypes.string,
  cardSize: React.PropTypes.string,
  headerHeight: React.PropTypes.number,
  onScroll: React.PropTypes.func,
  scrollToTop: React.PropTypes.func,
  hasScrolled: React.PropTypes.bool,
  scrollEventThrottle: React.PropTypes.number,
  emptyListText: React.PropTypes.string.isRequired,
};

class ProductListView extends React.Component {
  constructor(props) {
    super(props)

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = { ds: ds.cloneWithRows(props.products) }

    this.renderHeader = this.renderHeader.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!!nextProps.products !== undefined) {
      this.setState({
        ds: this.state.ds.cloneWithRows(nextProps.products)
      });
    }

    if (!nextProps.hasScrolled && this.props.hasScrolled) {
      this.refs.products.scrollTo({ y: 0 })
    }
  }

  renderHeader = () => {
    if (!this.props.header) return <View style={{ height: this.props.headerHeight }} />

    return (
      <View>
        { this.props.header }
      </View>
    )
  }

  renderSectionHeader = () => {
    if (this.props.products.length === 0) {
      return (
        <View style={[{ height: 200 }, styles.placeholderContainer ]}>
          <Text style={ styles.placeholderText }>{ this.props.emptyListText }</Text>
        </View>
      );
    }

    return (
      <TouchableWithoutFeedback
        onPress={ () => this.props.scrollToTop() }
      >
        <View style={ styles.headerContainer }>
          <Text style={ styles.headerText }>
            { this.props.title }
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderRow = (data) => {
    return (
      <ProductCard
        product={ data }
        cardSize={ this.props.cardSize }
      />
    );
  }

  renderSeparator = (sectionID, rowID) => (
    <View style={ styles.separator } key={ rowID } />
  )

  render() {
    let { products, title, loadMoreProducts } = this.props;

    return (
      <ListView
        ref='products'
        dataSource={ this.state.ds }
        automaticallyAdjustContentInsets={ false }
        showsVerticalScrollIndicator={ false }
        renderHeader={ this.renderHeader }
        renderSectionHeader={ this.renderSectionHeader }
        renderRow={ this.renderRow }
        renderSeparator={ this.renderSeparator }
        contentInset={{ top: 0, bottom: 45 }}
        onEndReached={ loadMoreProducts }
        enableEmptySections={ true }
        {...this.props}
      />
    );
  }
};

ProductListView.defaultProps = defaultProps;
ProductListView.propTypes = propTypes;

const styles = {
  headerContainer: {
    backgroundColor: '#f7f8f9',
  },

  headerText: {
    color: '#8c9aa0',
    lineHeight: 0,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 15,
    paddingVertical: 6,
  },

  separator: {
    height: 5,
    backgroundColor: '#f7f8f9',
  },

  placeholderContainer: {
    backgroundColor: '#f7f8f9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  placeholderText: {
    color: '#adadad',
    fontSize: 17,
    textAlign: 'center',
  },
};

export default ProductListView
