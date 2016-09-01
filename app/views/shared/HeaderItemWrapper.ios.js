'use strict';

import React from 'react';

import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ItemWrapper = ({ item }) => {
  if (!item) { return null; }

  let content;

  if (item.icon) {
    content = <Image source={ item.icon } />;
  } else if (item.title) {
    content = <Text>{ item.title }</Text>;
  }

  return (
    <TouchableOpacity
      onPress={ item.onPress }
      style={ styles.itemWrapper }
    >
      { content }
    </TouchableOpacity>
  );
};

ItemWrapper.propTypes = {
  item: React.PropTypes.shape({
    icon: React.PropTypes.string,
    title: React.PropTypes.string,
  }),
};

const styles = StyleSheet.create({
  itemWrapper: { paddingVertical: 11 },
});

export default ItemWrapper;
