'use strict'

import React from 'react'
import { View, Text, } from 'react-native'

class User extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#fff' }}>User</Text>
      </View>
    )
  }
}

export default User
