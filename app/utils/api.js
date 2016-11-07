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

export const submitProblem = (currentUser, subject, body) => {
  let url = `${URL}/help`;

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: currentUser.data.email, subject, body }),
  });
};
