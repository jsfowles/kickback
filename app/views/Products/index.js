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

class ProductListView extends React.Component {
  static defaultProps: {
    headerHeight: 0,
  }

  static propTypes: {
    products: React.PropTypes.array.isRequired,
    loadMoreProducts: React.PropTypes.func.isRequired,
    title: React.PropTypes.string,
    cardSize: React.PropTypes.string,
    headerHeight: React.PropTyles.integer,
  };

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

  renderSectionHeader = () => (
    <TouchableWithoutFeedback
      onPress={ () => this.props.scrollToTop() }
    >
      <View style={ styles.headerContainer }>
        <Text style={ styles.headerText }>
          { this.props.title }
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )

  renderRow = (data) => (
    <ProductCard
      product={ data }
      cardSize={ this.props.cardSize }
    />
  )

  renderSeparator = (sectionID, rowID) => (
    <View style={ styles.separator } key={ rowID } />
  )

  render() {
    let { products, title, loadMoreProducts } = this.props;

    if (products.length === 0) {
      return (
        <View style={[{ marginTop: this.props.headerHeight }, styles.placeholderContainer ]}>
          <Text style={ styles.placeholderText }>{ this.props.emptyListText }</Text>
        </View>
      )
    };

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
        {...this.props}
      />
    );
  }
};

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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 49,
  },

  placeholderText: {
    color: '#adadad',
    fontSize: 17,
    textAlign: 'center',
  },
};

export default ProductListView
