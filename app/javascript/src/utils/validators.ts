export const validateEmail = (email) => {
  if (!email) {
    return false;
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return false;
  }
  return true;
};

export default {
  validateEmail,
};
