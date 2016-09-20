/* eslint-env node, jest */
import { products, isFetching, errorMessage } from '../product';

jest.autoMockOff();

describe('products', () => {
  it('has the correct initial state', () => {
    expect(products('PRODUCT_FEED')(undefined, {})).toEqual([]);
  });
});

describe('isFetching', () => {
  it('has the correct initial state', () => {
    expect(isFetching('PRODUCT_FEED')(undefined, {})).toEqual(true);
  });
});

describe('errorMessage', () => {
  it('has the correct initial state', () => {
    expect(errorMessage('PRODUCT_FEED')(undefined, {})).toEqual(null);
  });
});
