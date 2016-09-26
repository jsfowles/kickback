import {
  serverUrl,
  apiVersion,
} from '../env';

const URL = `${serverUrl}/api/${apiVersion}`;

export const createLink = (product, user) => {
  let url = `${URL}/links`;
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      given_url: product.buyUrl,
      user_id: user,
      product,
    }),
  })
  .then((res) => res.json())
  .catch(_ => null);
};

export const getProducts = (searchTerm) => {
  let st = searchTerm.toLowerCase().trim();
  let url = `${URL}/searches`;

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ search: { search_term: st }}),
  })
  .then(res => res.json())
  .catch(_ => null);
};

export const getUsersProducts = (id, session) => {
  let url = `${URL}/users/${id}/products`;

  const headers = {
    'Content-Type': 'application/json',
    ...session,
  };

  return fetch(url, {
    method: 'GET',
    headers: headers,
  })
  .then(res => res.json());
};

export const loginUser = (credentials) => {
  let url = `${URL}/auth/sign_in`;

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  .catch(_ => null);
};

export const createUser = credentials => {
  let url = `${URL}/auth`;

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  .catch(_ => null);
};

export const updateUser = session => {
  let url = `${URL}/auth`;

  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...session,
    },
    body: JSON.stringify({
      email: 'test@gmail.com',
    }),
  })
  .catch(_ => null);
};

export const submitProblem = (currentUser, subject, body) => {
  let url = `${URL}/help`;

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: currentUser.data.email, subject, body }),
  });
};
