export const validateEmail = (email) => {
  //the code is to validate email and ensure email format using regex

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
