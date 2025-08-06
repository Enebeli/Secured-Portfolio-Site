require('dotenv').config(); 

const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const mongoose = require('mongoose'); 
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const rateLimit = require('express-rate-limit');
require('./config/Passport'); 
const router = express.Router();
const verifyToken = require('./middleware/verifyToken');
const checkRole = require('./middleware/checkRole');
const dashboardRoutes = require('./routes/dashboard');
const profileRoutes = require('./routes/profile');
const authRoutes = require('./routes/auth');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(cookieParser()); // Must come before csrf

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
})); 

app.use(express.urlencoded({ extended: true })); // For parsing form data

app.use(csrf({ cookie: true })); // Now: Enable CSRF protection

app.use(express.json()); // Optional: for parsing JSON if needed

app.use(helmet());

app.use('/dashboard', dashboardRoutes);
app.use('/profile', profileRoutes);
app.use('/auth', authRoutes);

app.get('/auth-test', (req, res) => {
  res.send(`
    <form action="/auth/register" method="POST">
      <input type="hidden" name="_csrf" value="${req.csrfToken()}">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="email" name="email" placeholder="Email" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Register</button>
    </form>

    <form action="/auth/login" method="POST">
      <input type="hidden" name="_csrf" value="${req.csrfToken()}">
      <input type="email" name="email" placeholder="Email" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Login</button>
    </form>
  `);
});


// Admin only
router.get('/admin', verifyToken, checkRole('Admin'), (req, res) => {
  res.json({ message: 'Welcome, Admin' });
});

// Shared route with role-specific behavior
router.get('/dashboard', verifyToken, (req, res) => {
  const role = req.user.role;
  if (role === 'Admin') {
    res.json({ message: 'Admin Dashboard: Access to all data' });
  } else {
    res.json({ message: 'User Dashboard: Access to limited data' });
  }
});

module.exports = router;



const options = {
  key: fs.readFileSync('./ssl/server.key'),
  cert: fs.readFileSync('./ssl/server.cert')
};


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


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

app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});



https.createServer(options, app).listen(3000, () => {
  console.log('Secure server running at https://localhost:3000');
});
