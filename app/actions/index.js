import * as productFeedActions from './productFeed';
import * as searchActions from './search';
import * as navigationActions from './navigation';
import * as productActions from './product';
import * as userActions from './user';
import * as sessionActions from './sessions';
import * as settingsActions from './settings';

module.exports = {
  ...productFeedActions,
  ...searchActions,
  ...navigationActions,
  ...productActions,
  ...userActions,
  ...sessionActions,
  ...settingsActions,
};
