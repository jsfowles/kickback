/* eslint-env node, jest */
'use strict';

const products = [
  { id: 103, title: 'Beal Tiger Unicore Dry Cover Climbing Rope - 10mm' },
  { id: 86, title: 'Beal Joker Unicore Dry Cover Climbing Rope - 9.1mm' },
];

export default function request() {
  return new Promise((resolve) => {
    process.nextTick(_ => resolve(products));
  });
}
