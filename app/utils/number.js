'use strict';

import { validateNum } from './validations';

export const numberToDollars = (x) => {
  if (parseInt(x, 10) === 0 || !validateNum(x)) {
    return '0.00';
  }

  let price = x.toString();
  price = price.replace('.', '').replace(',', '');

  let dollars = price.slice(0, price.length - 2);
  let cents = price.slice(price.length - 2);

  return `${dollars}.${cents}`;
};

export const numberToCurrency = (x) => {
  let parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  parts[1] = parts[1] && parts[1].length === 1 ? parts[1] + '0' : parts[1];

  return `$${parts.join(".")}`;
};
