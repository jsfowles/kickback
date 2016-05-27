'use strict'

import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Animated,
  Dimensions,
  TextInput,
  Easing,
} from 'react-native'

const {
  height: deviceHeight,
  width: deviceWidth,
} = Dimensions.get('window')

import {
  toggleSearchOverlay,
  requestProducts,
} from '../../../actions'

import SearchInput from './SearchInput'
import CancelBtn from './CancelBtn'

class FeaturedProductsHeader extends React.Component {
  static propTypes = {
    toggleSearchOverlay: React.PropTypes.func.isRequired,
    searching: React.PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      buttonWidth: 0,
      buttonHeight: 30,
      showForm: this.props.searching,
      transitioning: false,
    }
  }

  componentWillMount() {
    if (this.props.searching) {
      this.setState({
        transitionText: new Animated.Value(-((this.state.buttonWidth * .5) - (142.5 * 0.5))),
        transitionButton: new Animated.Value(deviceWidth - 75),
      })
    } else {
      this.setState({
        transitionText: new Animated.Value(0),
        transitionButton: new Animated.Value(deviceWidth - 20),
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searching !== this.props.searching && !this.state.transitioning) {
      this.animateAllTheThings(nextProps.searching)
    }
  }

  animateAllTheThings = (searching) => {
    this.setState({ showForm: false })
    let textToValue = 0
    let buttonToValue = deviceWidth - 20

    if (searching) {
      // TODO: Probably should do this more programatically
      textToValue = -((this.state.buttonWidth * .5) - (142.5 * 0.5))
      buttonToValue = this.state.buttonWidth - 55
    }

    let animationConfig = { duration: 150 }

    Animated.parallel([
      Animated.timing( this.state.transitionText, {
        toValue: textToValue,
        ...animationConfig,
      }),

      Animated.timing( this.state.transitionButton, {
        toValue: buttonToValue,
        ...animationConfig,
      })
    ]).start(() => {
      this.setState({ showForm: this.props.searching, transitioning: false })
    })
  }

  buttonOnLayout = (e) => {
    let { x, y, width, height } = e.nativeEvent.layout;
    this.setState({
      buttonWidth: width,
      buttonHeight: height,
    })
  }

  render() {
    let { navigator, toggleSearchOverlay, searchText, searching } = this.props
    let placeholder = searchText ? searchText : 'Search'

    return (
      <Animated.View
        ref='button'
        onLayout={ this.buttonOnLayout }
        style={{ width: this.state.transitionButton }}
      >
        { !this.state.showForm && <TouchableOpacity
          style={ styles.button }
          activeOpacity={ 1 }
          onPress={ toggleSearchOverlay }
        >
          <Animated.View
            style={[{ transform: [{ translateX: this.state.transitionText }]}, styles.buttonContainer ]}
          >
            <Image source={ require('image!search') } />
            <Text style={ styles.buttonText }>{ placeholder }</Text>
          </Animated.View>
        </TouchableOpacity> }

        { this.state.showForm && <SearchInput
          requestProducts={ requestProducts }
          style={ styles.button }
          navigator={ navigator }
          toggleSearchOverlay={ toggleSearchOverlay }
          placeholder={ placeholder }
        /> }
        { this.props.navigator && <CancelBtn toggleSearchOverlay={ () => {
            navigator.pop()
            toggleSearchOverlay()
          }}
        /> }
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(11, 87, 119, 0.15)',
    height: 30,
    borderRadius: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#2dadcd',
    overflow: 'hidden',
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  buttonText: {
    color: '#fff',
    marginLeft: 5,
  },
})

const mapStateToProps = (state) => ({
  searching: state.search.searching,
  searchText: state.search.searchText,
})

const mapActionsToProps = (dispatch) => ({
  toggleSearchOverlay: () => dispatch(toggleSearchOverlay()),
  requestProducts: (e) => dispatch(requestProducts(e.nativeEvent.text)),
})

export default connect(mapStateToProps, mapActionsToProps)(FeaturedProductsHeader)
