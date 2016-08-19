import {
  serverUrl,
  apiVersion,
} from '../env'

const URL = `${serverUrl}/api/${apiVersion}`

export const getProductFeed = (url) => {
  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json())
  .catch(e => console.error(e))
}

export const createLink = (product) => {
  let url = `${URL}/links`;
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      given_url: product.buyUrl,
      user_id: 1,
      product,
    })
  })
  .then((res) => res.json())
  .catch(e => console.error(e))
}

export const getProducts = (searchTerm) => {
  searchTerm = searchTerm.toLowerCase().trim();
  let url = `${URL}/searches`
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ search: { search_term: searchTerm }})
  })
  .then(res => res.json())
  .catch(e => console.error(e))
}

export const getCurrentUser = (url, session) => {
  const headers = {
    'Content-Type': 'application/json',
    ...session,
  };

  return fetch(url, {
    method: 'GET',
    headers: headers,
  })
  .catch(e => console.error(e))
}

export const loginUser = (credentials) => {
  let url = `${URL}/auth/sign_in`

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  .catch(e => console.error(e))
}

export const createUser = credentials => {
  let url = `${URL}/auth`;
  console.log(url);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  .then(res => res)
  .catch(e => console.log(e));
};
