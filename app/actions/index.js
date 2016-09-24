import * as feedActions from './feed';
import * as searchActions from './search';
import * as navigationActions from './navigation';
import * as productActions from './product';
import * as userActions from './user';
import * as sessionActions from './sessions';
import * as settingsActions from './settings';
import * as tabsActions from './tabs';
import * as userProductsActions from './user-products';

module.exports = {
  ...feedActions,
  ...searchActions,
  ...navigationActions,
  ...productActions,
  ...userActions,
  ...sessionActions,
  ...settingsActions,
  ...tabsActions,
  ...userProductsActions,
};
