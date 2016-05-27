import * as productFeedActions from './productFeed'
import * as searchActions from './search'
import * as navigationActions from './navigation'

module.exports = {
  ...productFeedActions,
  ...searchActions,
  ...navigationActions,
}
