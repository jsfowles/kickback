/* eslint-env node, jest */
'use strict';

import { formatConstant } from '../string';

jest.autoMockOff();

describe('formatConstant', () => {
  it('Should convert a constant string to camel case', () => {
    expect(formatConstant('ONE_TWO_THREE')).toEqual('oneTwoThree');
  });

  it('Should keep a number a number', () => {
    expect(formatConstant('ONE_2_THREE')).toEqual('one2Three');
  });
});
