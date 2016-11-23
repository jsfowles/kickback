import Request from '../utils/request';

import { changeTab } from './tabs';
import { reset, push } from './navigation';
import { fetchUserSuccess } from './user';

export const storeDeviceToken = token => (dispatch, getState) => {
  let { session } = getState().session;
  let { user } = getState().user;

  const requestObj = {
    path: `users/${user.id}/devices`,
    method: 'POST',
    headers: session,
    body: { device: { token }},
  };

  return new Request(requestObj);
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

export const updateNotificationSettings = (value, field) => (dispatch, getState) => {
  let { user } = getState().user;
  let { session } = getState().session;

  let requestObj = {
    method: 'PUT',
    path: `/users/${user.id}/notifications/${user.notification.id}`,
    headers: session,
    body: { notification: { [field]: value }},
  };

  dispatch({ type: 'UPDATE_USER_NOTIFICATION_SETTINGS', field, value });

  return new Request(requestObj).then(res => dispatch(fetchUserSuccess(res)));
};
