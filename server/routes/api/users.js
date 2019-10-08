const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');


// User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', [
  check('name', 'Name is required.').not().isEmpty(),
  check('email', 'Please enter a valid email address.').isEmail(),
  check('password', 'Please enter a password with 2 or more characters. ').isLength({ min: 2 })
],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const { name, email, password } = req.body;
      // Check for existing user
      let user = await User.findOne({ email });
      
      if (user) return res.status(400).json({ msg: 'User already exists' });
      
      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      jwt.sign(
        { id: user.id },
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    }
    catch (error) {
      console.error(error.message);
      res.status(500).send('Server error.');
    }

  });

module.exports = router;
