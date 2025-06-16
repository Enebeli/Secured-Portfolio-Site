const express = require('express');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const path = require('path');

const app = express();
const options = {
  key: fs.readFileSync('./ssl/server.key'),
  cert: fs.readFileSync('./ssl/server.cert')
};

app.use(helmet());
app.use(express.json());
app.use(express.static('public'));

const projectRoutes = require('./routes/projects');
const blogRoutes = require('./routes/blog');
const contactRoutes = require('./routes/contact');

app.use('/projects', projectRoutes);
app.use('/blog', blogRoutes);
app.use('/contact', contactRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

https.createServer(options, app).listen(3000, () => {
  console.log('Secure server running at https://localhost:3000');
});

app.get('/projects', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=59');
  res.json([{ name: "Portfolio Site", tech: "HTML/CSS/JS" }]);
});

app.get('/blog', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300');
  res.json([{ title: "My First Blog Post", date: "2025-06-15" }]);
});

app.get('/contact', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});
