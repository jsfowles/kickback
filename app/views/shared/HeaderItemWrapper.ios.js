'use strict'
import React from 'react'
import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

const ItemWrapper = ({ item }) => {
  let content;

  if (item.icon) {
    content = <Image source={ item.icon } />;
  } else if (item.title) {
    content = <Text>{ item.title }</Text>
  }

  return (
    <TouchableOpacity
      onPress={ item.onPress }
      style={ styles.itemWrapper }
    >
      { content }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemWrapper: { paddingVertical: 11 },
})

export default ItemWrapper
