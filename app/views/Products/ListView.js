'use strict'

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ListView,
} from 'react-native'

import ProductCardLarge from './ProductCardLarge'
import ProductCardSmall from './ProductCardSmall'

class ProductListView extends React.Component {
  static propTypes: {
    products: React.PropTypes.array.isRequired,
    title: React.PropTypes.string,
    cardSize: React.PropTypes.string,
  };

  constructor(props) {
    super(props)

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = { ds: ds.cloneWithRows(props.products) }

    this.renderHeader = this.renderHeader.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

  renderHeader() {
    return (
      <View style={ styles.headerContainer }>
        <Text style={ styles.headerText }>
          { this.props.title }
        </Text>
      </View>
    )
  }

  renderRow(data) {
    if (this.props.cardSize === 'large') {
      return <ProductCardLarge product={ data } />
    } else {
      return <ProductCardSmall />
    }
  }

  renderSeparator = () => {
    return <View style={ styles.separator } />
  }

  render() {
    let { products, title } = this.props

    return (
      <ListView
        dataSource={ this.state.ds }
        automaticallyAdjustContentInsets={ false }
        renderHeader={ this.renderHeader }
        renderRow={ this.renderRow }
        renderSeparator={ this.renderSeparator }
        contentInset={{ top: 0, bottom: 50 }}
      />
    )
  }
}

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
    background: 'green',
  },
}

export default ProductListView
