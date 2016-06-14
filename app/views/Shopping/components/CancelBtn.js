'use strict'
import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import { toggleSearchOverlay } from '../../../actions'

const CancelBtn = ({
  toggleSearchOverlay,
}) => (
  <TouchableOpacity
    style={ styles.cancelBtn }
    activeOpacity={ 1 }
    onPress={ toggleSearchOverlay }
  >
    <Text style={{ color: '#fff' }}>Cancel</Text>
  </TouchableOpacity>
)

CancelBtn.propTypes = {
  /**
   * @description: This is to hide the search overlay
   */
  toggleSearchOverlay: React.PropTypes.func.isRequired,
}

const styles= StyleSheet.create({
  cancelBtn: {
    position: 'absolute',
    right: 0,
    transform: [{
      translateX: 55,
    }],
    top: 0,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const mapStateToProps = (state) => ({})

const mapActionsToProps = (dispatch) => ({
  toggleSearchOverlay: () => dispatch(toggleSearchOverlay()),
})

export default connect(mapStateToProps, mapActionsToProps)(CancelBtn)
