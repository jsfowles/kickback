'use strict';

import React from 'react';
import {
  View,
  Text,
  ListView,
} from 'react-native';

import ProductCard from './components/CardContainer';

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
  emptyListText: React.PropTypes.string,
  header: React.PropTypes.object,
};

const DS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class ProductListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ds: DS.cloneWithRows(props.products) };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.products !== this.props.products) {
      this.setState({ ds: DS.cloneWithRows(nextProps.products) });
    }
  }

  renderHeader = () => {
    if (!this.props.header) {
      return <View style={{ height: this.props.headerHeight }} />;
    }

    return <View>{ this.props.header }</View>;
  }

  renderSectionHeader = () => {
    if (this.props.title) {
      return (
        <View style={ styles.headerContainer }>
          <Text style={ styles.headerText }>
             { this.props.title }
          </Text>
        </View>
      );
    }
    return null;
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
    let { loadMoreProducts } = this.props;

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
        { ...this.props }
      />
    );
  }
}

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

export default ProductListView;
