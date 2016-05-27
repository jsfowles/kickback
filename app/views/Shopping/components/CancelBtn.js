'use strict'
import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import { cancelSearch } from '../../../actions'

const CancelBtn = ({
  navigator,
  cancelSearch,
}) => (
  <TouchableOpacity
    style={ styles.cancelBtn }
    activeOpacity={ 1 }
    onPress={ () => {
      cancelSearch()
      navigator.pop()
    }}
  >
    <Text style={{ color: '#fff' }}>Cancel</Text>
  </TouchableOpacity>
)

CancelBtn.propTypes = {
  /**
   * @description: This is to clear all search back to its initial state
   */
  cancelSearch: React.PropTypes.func.isRequired,

  /**
   * @description: This is so that we can pop back to the featured product
   *               view when cancelled.
   */
  navigator: React.PropTypes.object.isRequired,
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
  cancelSearch: () => dispatch(cancelSearch()),
})

export default connect(mapStateToProps, mapActionsToProps)(CancelBtn)
