import {
  serverUrl,
  apiVersion,
} from '../env'

const URL = `${serverUrl}/api/${apiVersion}`

export const getProductFeed = () => {
  let url = `${URL}/product_feed`
  return fetch(url, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json())
}

export const createLink = (product) => {
  let url = `${URL}/links`;
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
  let url = `${URL}/searches`
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

export const getCurrentUser = () => {
  // TODO (Riley) : Don't hardcode this
  let url = `${URL}/users/1`
  return fetch(url, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json())
}
