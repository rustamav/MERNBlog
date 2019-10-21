const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Post Model
const Post = require('../../models/Post');

// @route   GET api/posts
// @desc    Get All posts
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/posts
// @desc    Update a post with id
// @access  Public
router.post('/', auth, async (req, res) => {
  const postFields = {};
  postFields.content = req.body.content;
  postFields.title = req.body.title;
  postFields.author = req.body.author;
  try {
    let post = {};
    const id = req.body._id;
    if (id) {
      post = await Post.findOneAndUpdate(
        { _id: req.body._id },
        { $set: postFields },
        { new: true }
      );
      res.json(post);
    } else {
      const error = 'Post ID is missing.';
      console.error(error);
      req.status(400).send(error);
    }
  } catch (error) {
    console.error(error);
    req.status(500).send('Server error');
  }
});

// @route   POST api/posts
// @desc    Create a post
// @access  Public
router.post('/new', auth, async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  });
  await post.save();
  console.log('Created new post.');
  console.log(post);
  res.json(post);
});

// @route   DELETE api/posts/:id
// @desc    Delete A post
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Post.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
