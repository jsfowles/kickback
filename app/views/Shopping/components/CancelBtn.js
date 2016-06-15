'use strict'
import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Animated,
} from 'react-native'

import { toggleSearchOverlay } from '../../../actions'

class CancelBtn extends React.Component {
  render() {
    let { toggleSearchOverlay } = this.props

    return (
      <Animated.View
        style={{ overflow: 'hidden', width: this.props.width }}
      >
        <TouchableOpacity
          activeOpacity={ 1 }
          onPress={ toggleSearchOverlay }
        >
          <Text style={ styles.cancelTxt }>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

CancelBtn.propTypes = {
  /**
   * @description: This is to hide the search overlay
   */
  toggleSearchOverlay: React.PropTypes.func.isRequired,
}

const styles= StyleSheet.create({
  cancelTxt: {
    color: '#fff',
    marginLeft: 10,
    width: 44.5,
  },
})

const mapStateToProps = (state) => ({})

const mapActionsToProps = (dispatch) => ({
  toggleSearchOverlay: () => dispatch(toggleSearchOverlay()),
})

export default connect(mapStateToProps, mapActionsToProps)(CancelBtn)
