/* eslint-env node, jest */
import * as actions from '../app';

describe('triggerModal', () => {
  it('it should create an action with a modal string attached', () => {
    const modal = 'session';
    const expectedAction = { type: 'TRIGGER_MODAL', modal: 'session' };
    expect(actions.triggerModal(modal)).toEqual(expectedAction);
  });

  it('it should create an action with a modal string attached', () => {
    const expectedAction = { type: 'CLOSE_MODAL' };
    expect(actions.closeModal()).toEqual(expectedAction);
  });
});
