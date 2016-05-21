import {
  serverUrl,
  apiVersion
} from '../env'

export const getProductFeed = () => {
  let url = `${serverUrl}/api/${apiVersion}/product_feed`

  return fetch(url, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json())
}
