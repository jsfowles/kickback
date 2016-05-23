'use strict';

export const numberToDollars = (x) => {
	if (x === 0) { return '0.00' }
	let price = x.toString();
	let dollars = price.slice(0, price.length - 2);
	let cents = price.slice(price.length - 2);
	return `${dollars}.${cents}`
}

export const numberToCurrency = (x) => {
	let parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return `$${parts.join(".")}`;
}
