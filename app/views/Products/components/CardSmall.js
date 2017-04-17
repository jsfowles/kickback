import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import ProductImage from './ProductImage';
import CardWrapper from './CardWrapper';

const ProductCardSmall = ({
  children,
  product,
}) => (
  <View style={ styles.rowContainer }>
    <CardWrapper product={ product }>
      <View style={ styles.productContainer }>
        <View style={ styles.imageContainer }>
          <ProductImage style={ styles.thumb } imageUrl={ product.largeImageUrl } />
        </View>
        <Text style={ styles.title }>{ product.title }</Text>
      </View>
    </CardWrapper>

    { children }
  </View>
);

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingHorizontal: 35,
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },

  itemContainer: {
    marginBottom: 15,
    flex: 1,
    alignItems: 'center',
  },

  thumb: {
    width: 75,
    height: 75,
  },

  title: {
    fontSize: 17,
    paddingTop: 5,
    color: '#6D7577',
    flex: 2,
  },

  imageContainer: { flex: 1 },

  productContainer: {
    flexDirection: 'row',
    position: 'relative',
    paddingTop: 30,
    marginBottom: 15,
  },
})

export default ProductCardSmall
