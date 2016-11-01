export const validateEmail = (email) => {
  let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
};

export const validateNum = (n) => !isNaN(parseFloat(n)) && isFinite(n);

export const validatePassword = (s) => s ? s.length > 5 : false;

export const validateCredentials = ({ email, password })  => (
  validateEmail(email) && validatePassword(password)
);
