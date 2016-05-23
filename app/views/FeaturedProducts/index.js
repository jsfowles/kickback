'used strict'

import React from 'react'
import { connect } from 'react-redux'

import Container from '../shared/Container'
import ProductList from '../shared/ProductListView'
import Header from './components/FeaturedProductsHeader'

class FeaturedProducts extends React.Component {
  render() {
    let { productFeed } = this.props

    return (
      <Container
        header={ () => <Header /> }
      >
        <ProductList
          products={ productFeed.products }
          title='FEATURED PRODUCTS'
          cardSize='large'
        />
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  productFeed: state.productFeed,
})

const mapActionsToProps = (dispatch) => ({})

export default connect(mapStateToProps)(FeaturedProducts)
