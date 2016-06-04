import {
  serverUrl,
  apiVersion,
  avantLinkUrl,
} from '../env'

export const getProductFeed = () => {
  let url = `${serverUrl}/api/${apiVersion}/product_feed`

  return fetch(url, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json())
}

export const getSharedLinks = () => {
  // TODO (Riley) : Do not hardcode this
  let url = `${serverUrl}/api/v1/links?user_id=1`;
  return fetch(url, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json())
}

export const createLink = (product) => {
  let url = `${serverUrl}/api/v1/links`;
  return fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      given_url: product.buyUrl,
      // TODO (Riley) : Do not hardcode this
      user_id: 1,
      product,
    })
  })
  .then((res) => res.json())
}

export const getProducts = (searchTerm) => {
  searchTerm = searchTerm.toLowerCase().trim();
  let url = `${avantLinkUrl}search_term=${searchTerm}&search_results_sort_order=Retail+Price%7Cdesc&search_results_count=100`
  return fetch(url).then((res) => res.json());
}

