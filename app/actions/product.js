'use strict'

import { createLink } from '../utils/api'
import { ActionSheetIOS } from 'react-native'

export const toggleCreatingRecommendation = (bool) => ({ type: 'TOGGLE_CREATING_RECOMMENDATION', bool })

export const recommendProduct = (product) => {
  return (dispatch) => {
    dispatch(toggleCreatingRecommendation(true))

    createLink(product).then((res) => {
      dispatch(toggleCreatingRecommendation(false))

      ActionSheetIOS.showShareActionSheetWithOptions(
        { url: res.url },
        // TODO (Riley) : Show error?
        (error) => console.log('TODO: error'),
        (success,method) => {
          // TODO (Riley) : Show success
        }
      )
    // TODO (Riley) : Show some type of error
    }).catch((res) => {
      console.log(res)
      dispatch(toggleCreatingRecommendation(false))
    })
  }
}
