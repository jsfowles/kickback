'use strict'

import { createLink } from '../utils/api'
import { ActionSheetIOS } from 'react-native'

export const toggleCreatingRecommendation = () => ({ type: 'TOGGLE_CREATING_RECOMMENDATION' })

export const recommendProduct = (product) => {
  return (dispatch) => {
    dispatch(toggleCreatingRecommendation())

    createLink(product).then((res) => {
      dispatch(toggleCreatingRecommendation())

      ActionSheetIOS.showShareActionSheetWithOptions(
        { url: res.url },
        // TODO (Riley) : Show error?
        (error) => console.log('TODO: error'),
        (success,method) => {
          // TODO (Riley) : Show success
        }
      )
    })
  }
}
