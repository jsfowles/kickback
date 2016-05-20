'use strict'

import React from 'react'
import { View, Text, } from 'react-native'
import Container from '../shared/Container'
import { connect } from 'react-redux'

import { navigateSettings } from '../../actions/settings'

class User extends React.Component {
  render() {
    let rightItem = {
      icon: require('image!settings'),
      onPress: () => this.props.navigateSettings(),
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

const mapStateToProps = (state) => ({})
const mapActionsToProps = (dispatch) => ({
  navigateSettings: () => dispatch(navigateSettings()),
})

export default connect(mapStateToProps, mapActionsToProps)(User)
