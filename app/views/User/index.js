'use strict'

import React from 'react'
import { View, Text, } from 'react-native'
import Container from '../shared/Container'

class User extends React.Component {
  render() {
    let rightItem = {
      icon: require('image!settings'),
      onPress: () => console.log('???'),
    }

    return (
      <Container
        rightItem={ rightItem }
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>User</Text>
        </View>
      </Container>
    )
  }
}

export default User
