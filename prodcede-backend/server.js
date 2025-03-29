// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
//const bcrypt = require('bcrypt');
//const db = require('./db'); 
const bcrypt = require('bcryptjs'); // change this line


app.use(cors());
app.use(express.json());

db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // replace with your MySQL password
  database: 'prodcede',
});

db.connect((err) => {
  if (err) {
    console.error('error connecting to database:', err.stack);
    return;
  }
  console.log('connected to database');
});

app.get('/orders', (req, res) => {
  db.query('SELECT * FROM orders', (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Signup Route
// Backend signup route
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error checking if user exists:', err);
      return res.status(500).send('Server error');
    }

    if (results.length > 0) {
      return res.status(400).send('Email already registered');
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).send('Server error');
      }

      // Insert new user into the database
      const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      db.query(query, [name, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Error inserting user into database:', err);
          return res.status(500).send('Server error');
        }

        return res.status(201).send('User registered successfully');
      });
    });
  });
});

// Login API route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the email exists in the database
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user = results[0];
    // Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ token });
  });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
