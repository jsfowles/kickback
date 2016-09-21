/* eslint-env node, jest */
'use strict';
import * as actions from '../sessions';

jest.autoMockOff();

describe('sessions actions', () => {
  describe('receiveSession', () => {

  });

  describe('changeSessionTab', () => {
    it('should create an action to switch the tab', () => {
      const tab = 'SIGN_UP';
      const expectedAction = { type: 'CHANGE_SESSION_TAB', tab: 'SIGN_UP' };

      expect(actions.changeSessionTab(tab)).toEqual(expectedAction);
    });
  });

  describe('updateSessionEmail', () => {
    it('should create an action to update the email with passed in email', () => {
      const string = 'monstro@underbelly.is';
      const expectedAction = { type: 'UPDATE_EMAIL', string: 'monstro@underbelly.is' };

      expect(actions.updateSessionEmail(string)).toEqual(expectedAction);
    });
  });
});
