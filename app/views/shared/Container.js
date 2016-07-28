'use strict'

import React from 'react'
import {
  View,
  StyleSheet,
  Platform,
  Animated,
  Text,
  ScrollView,
} from 'react-native'

import Header from './Header'
import ParallaxBackground from './ParallaxBackground'

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      anim: new Animated.Value(0),
    })
  }

  handleScroll = (e) => {
    if (!this.props.hasScrolled) { this.props.setHasScrolled() }
    this.state.anim.setValue(e.nativeEvent.contentOffset.y);
  }

  render() {
    const {
      header,
      children,
      rightItem,
      parallaxContent,
      style,
      headerColors,
      headerHeight,
    } = this.props

    const content = React.cloneElement(children, {
      onScroll: (e) => this.handleScroll(e),
      scrollEventThrottle: 16,
    })

    return (
      <View style={[ styles.container, style ]}>
        <View style={ styles.header }>
          { parallaxContent && <ParallaxBackground
            parallaxContent={ parallaxContent }
            offset={ this.state.anim }
            minHeight={ 14 }
            maxHeight={ 14 + headerHeight }
          /> }
        </View>

        { content }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f7f8f9',
  },

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
})

export default Container
