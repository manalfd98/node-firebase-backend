
export const signUp = (req, res) => {
  console.log('Signup successful');
  res.send('Signup successful');
};
export const login = (req, res) => {
  console.log('login successful');
  res.send('login successful');
};

const authController = {
  signUp,
  login
};

export default authController;

