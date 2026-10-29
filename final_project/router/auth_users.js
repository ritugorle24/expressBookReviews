
const express = require('express');
const jwt = require('jsonwebtoken');
const books = require('./booksdb.js');
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  return users.some(user => user.username === username);
};

const authenticatedUser = (username, password) => {
  return users.some(
    user => user.username === username && user.password === password
  );
};


regd_users.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({
      message: 'Invalid username or password'
    });
  }

  req.session.username = username;

  const token = jwt.sign(
    { username },
    'fingerprint_customer',
    { expiresIn: '1h' }
  );

  return res.status(200).json({
    message: 'Login successful',
    token
  });
});


  const token = jwt.sign({ username }, 'fingerprint_customer', {
    expiresIn: '1h'
  });

  return res.status(200).json({ message: 'Login successful', token });
});

regd_users.put('/auth/review/:isbn', (req, res) => {
  const username = req.session?.username;
  const isbn = req.params.isbn;
  const review = req.query.review ?? req.body.review;

  if (!username) {
    return res.status(401).json({ message: 'Please log in first' });
  }

  if (!books[isbn]) {
    return res.status(404).json({ message: 'Book not found' });
  }

  if (!review) {
    return res.status(400).json({ message: 'Review is required' });
  }

  books[isbn].reviews = books[isbn].reviews || {};
  books[isbn].reviews[username] = review;

  return res.status(200).json({ message: 'Review added successfully' });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.authenticatedUser = authenticatedUser;

