/* eslint-env node, jest */
'use strict';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as actions from '../search';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

jest.autoMockOff();

describe('search actions', () => {
  describe('toggleSearchOverlay', () => {
    it('should create an action to add a todo', () => {
      const expectedAction = { type: 'TOGGLE_SEARCH_OVERLAY' };
      expect(actions.toggleSearchOverlay()).toEqual(expectedAction);
    });
  });

  describe('cancelSearch', () => {
    it('should create an action to add a todo', () => {
      const expectedAction = { type: 'CANCEL_SEARCH' };
      expect(actions.cancelSearch()).toEqual(expectedAction);
    });
  });

  describe('fetchSearch', () => {
    // TODO: Write this
  });
});
