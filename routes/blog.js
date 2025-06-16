const express = require('express');
const router = express.Router();

const blogPosts = [
  { id: 1, title: 'My Dev Journey', content: 'Started from HTML, now we here.' },
  { id: 2, title: 'Why I Love Express', content: 'Because it makes backend easy and fun!' }
];

router.get('/', (req, res) => {
  res.json(blogPosts);
});

module.exports = router;
