'used strict'

import React from 'react'
import { View, Text, } from 'react-native'
import Container from '../shared/Container'
import Header from './components/FeaturedProductsHeader'

class FeaturedProducts extends React.Component {
  render() {
    return (
      <Container
        header={ () => <Header /> }
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>FeaturedProducts</Text>
        </View>
      </Container>
    )
  }
}

export default FeaturedProducts
