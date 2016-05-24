'used strict'

import React from 'react'
import {
  View,
  Animated,
} from 'react-native'
import { connect } from 'react-redux'

import Container from '../shared/Container'
import Products from '../Products'
import FeaturedCarousel from './components/FeaturedSearchesCarousel'

class FeaturedProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(0),
    }
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      { toValue: 1, duration: 200 }
    ).start()
  }

  render() {
    let { productFeed, currentTab } = this.props

    if (currentTab !== 'FEATURED_TAB') return null

    return (
      <Animated.View
        style={{ opacity: this.state.fadeAnim }}
      >
        <Products
          products={ productFeed.products }
          title='FEATURED PRODUCTS'
          cardSize='large'
          header={ <FeaturedCarousel /> }
        />
      </Animated.View>
    )
  }
}

const mapStateToProps = (state) => ({
  productFeed: state.productFeed,
  currentTab: state.navigation.tab,
})

const mapActionsToProps = (dispatch) => ({})

export default connect(mapStateToProps)(FeaturedProducts)
