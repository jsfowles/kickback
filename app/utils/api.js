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
  let url = `${serverUrl}/api/v1/searches`
  return fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      search: {
        search_term: searchTerm,
      }
    })
  }).then((res) => res.json());
}

