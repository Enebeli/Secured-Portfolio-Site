const express = require('express');
const router = express.Router();

const projects = [
  { id: 1, title: 'Snovat Website', tech: ['HTML', 'CSS', 'JavaScript'], link: 'https://snovat.com' },
  { id: 2, title: 'Reading Game App', tech: ['Node', 'Express'], link: 'https://github.com/yourusername/reading-game' }
];

router.get('/', (req, res) => {
  res.json(projects);
});

router.get('/:id', (req, res) => {
  const project = projects.find(p => p.id == req.params.id);
  if (!project) return res.status(404).json({ error: 'Not found' });
  res.json(project);
});

module.exports = router;
