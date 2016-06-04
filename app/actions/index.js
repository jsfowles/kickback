import * as productFeedActions from './productFeed'
import * as searchActions from './search'
import * as navigationActions from './navigation'
import * as productActions from './product'

module.exports = {
  ...productFeedActions,
  ...searchActions,
  ...navigationActions,
  ...productActions,
}
