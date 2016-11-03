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
    content = <Image source={ item.icon } style={ item.disabled ? styles.disabled : {}} />;
  } else if (item.title) {
    content = <Text style={[ styles.text, item.disabled ? styles.disabled : {} ]}>{ item.title }</Text>;
  }

  return (
    <TouchableOpacity
      disabled={ !!item.disabled }
      onPress={ item.onPress }
      style={ styles.itemWrapper }
    >
      { content }
    </TouchableOpacity>
  );
};

ItemWrapper.propTypes = {
  item: React.PropTypes.shape({
    icon: React.PropTypes.object,
    title: React.PropTypes.string,
    disabled: React.PropTypes.bool,
  }),
};

const styles = StyleSheet.create({
  itemWrapper: { paddingVertical: 11, minWidth: 28 },
  text: { color: '#fff' },
  disabled: { opacity: 0.5 },
});

export default ItemWrapper;
