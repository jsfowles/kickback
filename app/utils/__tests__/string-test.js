/* eslint-env node, jest */
'use strict';

import { formatConstant, underscoreToCamelCased } from '../string';

jest.autoMockOff();

describe('formatConstant', () => {
  it('Should convert a constant string to camel case', () => {
    expect(formatConstant('ONE_TWO_THREE')).toEqual('oneTwoThree');
  });

  it('Should keep a number a number', () => {
    expect(formatConstant('ONE_2_THREE')).toEqual('one2Three');
  });
});

describe('underscoreToCamelCased', () => {
  it('Should convert a constant string to camel case', () => {
    expect(underscoreToCamelCased('one_two_three')).toEqual('oneTwoThree');
  });

  it('Should keep a number a number', () => {
    expect(underscoreToCamelCased('one_2_three')).toEqual('one2Three');
  });
});
