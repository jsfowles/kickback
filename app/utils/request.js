export default function request() {
  return fetch('http://www.kbck.me/api/v1/product_feeds', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json())
  .catch(_ => null);
}

