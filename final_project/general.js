
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

function getBooksByISBN(isbn) {
  return axios
    .get(`${BASE_URL}/isbn/${encodeURIComponent(isbn)}`)
    .then(response => console.log(response.data))
    .catch(error => console.error(error.message));
}

async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(
      `${BASE_URL}/author/${encodeURIComponent(author)}`
    );
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

async function getBooksByTitle(title) {
  try {
    const response = await axios.get(
      `${BASE_URL}/title/${encodeURIComponent(title)}`
    );
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  getAllBooks,
  getBooksByISBN,
  getBooksByAuthor,
  getBooksByTitle
};
