/* eslint-env node, jest */
import { searchOverlay } from '../search';
import { products, isFetching, errorMessage } from '../product';

jest.autoMockOff();

describe('searchOverlay', () => {
  let action = { type: 'TOGGLE_SEARCH_OVERLAY' };

  it('has the correct initial state', () => {
    expect(searchOverlay(undefined, {})).toEqual(false);
  });

  it('is toggled to true when false', () => {
    expect(searchOverlay(false, action)).toBeTruthy();
  });

  it('is toggled to false when true', () => {
    expect(searchOverlay(true, action)).toBeFalsy();
  });
});

describe('products', () => {
  /**
   * Products should initially be a empty array, since it is
   * a empty list.
   */
  it('has the correct initial state', () => {
    expect(products('SEARCH')(undefined, {})).toEqual([]);
  });

  describe('successfull request', () => {
    let action = {
      type: 'FETCH_SEARCH_SUCCESS',
      products: [{"title":"DeFeet Crash Test Dummy 5in Sock"}],
    };

    /**
     * Will return a list of products when successfull;
     */
    it('should handle FETCH_SEARCH_SUCCESS and populate products', () => {
      expect(products('SEARCH')(undefined, action).length).toEqual(1);
    });
  });
});

describe('isFetching', () => {
  let action = { type: 'FETCH_SEARCH_REQUEST' };

  /**
   * It should be false by default because we aren't actually
   * fetching something right from the start.
   */
  it('has the correct initial state', () => {
    expect(isFetching('SEARCH')(undefined, {})).toEqual(false);
  });

  /**
   * It only calls fetch request when the request is made,
   * no other times
   */
  it('should handle FETCH_SEARCH_REQUEST when false', () => {
    expect(isFetching('SEARCH')(false, action)).toBeTruthy();
  });
});

describe('errorMessage', () => {
  it('has the correct initial state', () => {
    expect(errorMessage('SEARCH')(undefined, {})).toEqual(null);
  });
});
