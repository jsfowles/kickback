export const formatSession = ({ headers }) => {
  let { map } = headers;
  let session = null;

  if (map.hasOwnProperty('client')) {
    session = {
      'client': map.client[0],
      'token-type': map['token-type'][0],
      'access-token': map['access-token'][0],
      'uid': map.uid[0],
      'expiry': map.expiry[0],
    };
  }

  return session;
};
