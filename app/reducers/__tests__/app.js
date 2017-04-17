/* eslint-env node, jest */
'use strict';

import { modal } from '../app';

describe('modal reducer', () => {
  it('should initially be null', () => {
    expect(modal(undefined, {})).toBeNull();
  });

  it('should set the modal with TRIGGER_MODAL', () => {
    const action = { type: 'TRIGGER_MODAL', modal: 'session' };
    expect(modal(undefined, action)).toEqual('session');
  });

  it('should remove the modal with CLOSE_MODAL', () => {
    const action = { type: 'CLOSE_MODAL' };
    expect(modal(undefined, action)).toBeNull();
  });
});
