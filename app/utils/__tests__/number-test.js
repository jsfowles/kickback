/* eslint-env node, jest */
'use strict';

import { numberToDollars, numberToCurrency } from '../number';

jest.autoMockOff();

describe('numberToDollars', () => {
  it('should convert 0 int to 0.00 as a string', () => {
    expect(numberToDollars(0)).toEqual('0.00');
  });

  it('should convert 0 string to 0.00 as a string', () => {
    expect(numberToDollars('0')).toEqual('0.00');
  });

  it('should turn 500 int to 5.00 string', () => {
    expect(numberToDollars(500)).toEqual('5.00');
  });

  it('should turn 500 string to 5.00 string', () => {
    expect(numberToDollars('500')).toEqual('5.00');
  });

  it('5xw should return 0.00', () => {
    expect(numberToDollars('5xw')).toEqual('0.00');
  });

  it('5.00 should return 5.00', () => {
    expect(numberToDollars('5.00')).toEqual('5.00');
  });

  it('5,000.00 should return 5.00', () => {
    expect(numberToDollars('5.00')).toEqual('5.00');
  });
});

describe('numberToCurrency', () => {
  it('should convert 0.00 string to $0.00 as a string', () => {
    expect(numberToCurrency('0.00')).toEqual('$0.00');
  });

  it('should turn 5.00 int to $5.00 string', () => {
    expect(numberToCurrency('5.00')).toEqual('$5.00');
  });

  it('should turn 5.0 int to $5.00 string', () => {
    expect(numberToCurrency('5.0')).toEqual('$5.00');
  });

  it('should convert 5000.00 t0 $5,000.00', () => {
    expect(numberToCurrency('5000.00')).toEqual('$5,000.00');
  });
});
