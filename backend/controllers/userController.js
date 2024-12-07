const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Create JWT Token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Login User
const loginUser = async (req, res) => {
    console.log('Login endpoint hit');
    const { email, password } = req.body;
  
    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.status(200).json({ email, token });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ error: err.message });
    }
  };
  

// Signup User
const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password); // Signup Logic from Model
        const token = createToken(user._id); // Create Token
        res.status(200).json({ email, token }); // Send Response
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { signupUser, loginUser };
