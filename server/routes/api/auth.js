const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');


// User Model
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post('/', [
  check('email', 'Please enter a valid email address.').isEmail(),
  check('password', 'Password is required.').isLength({ min: 2 })
],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const { email, password } = req.body;
      // Check for existing user
      let user = await User.findOne({ email });
      
      if (!user) return res.status(400).json({ msg: 'Invalid credentials.' });

      const isMatch = await bcrypt.compare(password, user.password); 

      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' });

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
          });
        }
      );
    }
    catch (error) {
      console.error(error.message);
      res.status(500).send('Server error.');
    }

  });

// @route   GET api/auth/
// @desc    Get user data
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch(error){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
