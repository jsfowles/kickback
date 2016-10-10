/* eslint-env node, jest */
'use strict';

import 'react-native';
import { tabs } from '../tabs';

jest.autoMockOff();

const initialState = {
  index: 0,
  tabs: [
    { key: 'shopping', icon: require('image!cart') },
    { key: 'profile', icon: require('image!user') },
  ],
};

describe('tabs reducer', () => {
  it('has the correct initial state', () => {
    expect(tabs(undefined, {})).toEqual(initialState);
  });

  describe('change tab', () => {
    it('should have a new tab if a different tab is clicked', () => {
      expect(tabs(undefined, { type: 'CHANGE_TAB', index: 1 })).toEqual({
        ...initialState,
        index: 1,
      });
    });
  });
});
