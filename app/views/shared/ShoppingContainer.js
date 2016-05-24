'use strict'
import React from 'react'
import Container from './Container'
import Header from './ShoppingHeader'

const ShoppingContainer = ({ children }) => (
  <Container header={ () => <Header /> }>
    { children }
  </Container>
)

export default ShoppingContainer
