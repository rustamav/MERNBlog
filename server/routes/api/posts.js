const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");

// Post Model
const Item = require('../../models/Post');

// @route   GET api/posts
// @desc    Get All posts
// @access  Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   POST api/posts
// @desc    Create a post
// @access  Public
router.post('/', auth, (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
    author: req.body.author
  });

  newPost.save().then(item => res.json(item));
});

// @route   DELETE api/posts/:id
// @desc    Delete A post
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
