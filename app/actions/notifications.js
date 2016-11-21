import Request from '../utils/request';

import { changeTab } from './tabs';
import { reset, push } from './navigation';

export const storeDeviceToken = token => (dispatch, getState) => {
  let { session } = getState().session;
  let { user } = getState().user;

  const requestObj = {
    path: `users/${user.id}/devices`,
    method: 'POST',
    headers: session,
    body: { device: { token }},
  };

  return new Request(requestObj).then(res => console.log(res));
};

export const receivePushNotification = notification => dispatch => {
  const { foreground } = notification;

  if (!foreground) {
    dispatch(reset());
    dispatch(changeTab(1));

    if (notification.data.action === 'VIEW_DEPOSIT_SETTINGS') {
      dispatch(push({ key: 'depositSettings' }, 'profile'));
    }
  }
};
