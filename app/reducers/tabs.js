'use strict';

const initialState = {
  index: 0,
  tabs: [
    { key: 'shopping', icon: require('image!cart') },
    { key: 'profile', icon: require('image!user') },
  ],
};

export const tabs = (state = initialState, action) => {
  switch (action.type) {
  case 'CHANGE_TAB':
    if (action.index === state.index) { return state; }

    return {
      ...state,
      index: action.index,
    };
  default:
    return state;
  }
};
