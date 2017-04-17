/* eslint-env node, jest */
import { products, isFetching } from '../product';

jest.autoMockOff();

describe('products', () => {
  it('has the correct initial state', () => {
    expect(products('PRODUCT_FEED')(undefined, {})).toEqual([]);
  });
});

describe('isFetching', () => {
  it('has the correct initial state', () => {
    expect(isFetching('PRODUCT_FEED')(undefined, {})).toEqual(false);
  });
});
