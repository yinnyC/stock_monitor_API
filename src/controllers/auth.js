/* ******************** */
//        Auth.js       *
/* ******************** */
const jwt = require('jsonwebtoken');
const User = require('../models/user');

/* ******************** */
//      Controllers     *
/* ******************** */

exports.signupUser = (req, res) => {
  // Create User and JWT
  const user = new User(req.body);
  user.save().then((savedUser) => {
    const token = jwt.sign({ _id: savedUser._id }, process.env.SECRET, { expiresIn: '60 days' });
    res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
    return res.json({ user: savedUser });
  }).catch((err) => {
    console.log(err.message);
    return res.status(400).send({ err });
  });
};

exports.login = (req, res) => {
  /* This controller will compare user data
  and if correct, will create a token in cookie */
  const { username } = req.body;
  const { password } = req.body;
  // Find this user name
  User.findOne({ username }, 'username password')
    .then((user) => {
      if (!user) {
        // User not found
        return res.status(401).send({ message: 'Wrong Username or Password' });
      }
      // Check the password
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          return res.status(401).send({ message: 'Wrong Username or password' });
        }
        // Create a token
        const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
          expiresIn: '60 days',
        });
        // Set a cookie and redirect to root
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        res.send({ message: 'Logged In Successfully' });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.logout = (req, res) => {
  /* This controller will clear the token in Cookie
  to logout user */
  res.clearCookie('nToken');
  res.send({ message: 'Logged Out Successfully' });
};
