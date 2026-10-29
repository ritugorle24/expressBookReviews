
const express = require('express');
const books = require('./booksdb.js');
const { isValid, users } = require('./auth_users.js');

const public_users = express.Router();

public_users.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  if (isValid(username)) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  users.push({ username, password });
  return res.status(201).json({ message: 'User registered successfully' });
});

public_users.get('/', (req, res) => {
  return res.status(200).json(books);
});

public_users.get('/isbn/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  return book
    ? res.status(200).json(book)
    : res.status(404).json({ message: 'Book not found' });
});

public_users.get('/author/:author', (req, res) => {
  const author = decodeURIComponent(req.params.author);
  const result = Object.values(books).filter(
    book => book.author?.toLowerCase() === author.toLowerCase()
  );
  return res.status(200).json(result);
});

public_users.get('/title/:title', (req, res) => {
  const title = decodeURIComponent(req.params.title);
  const result = Object.values(books).filter(
    book => book.title?.toLowerCase() === title.toLowerCase()
  );
  return res.status(200).json(result);
});

public_users.get('/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  return book
    ? res.status(200).json(book.reviews || {})
    : res.status(404).json({ message: 'Book not found' });
});

module.exports.general = public_users;
_users;
