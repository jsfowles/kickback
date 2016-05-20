'use strict'

import React from 'react'
import { View, Text, } from 'react-native'

class FeaturedProducts extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#fff' }}>FeaturedProducts</Text>
      </View>
    )
  }
}

export default FeaturedProducts
