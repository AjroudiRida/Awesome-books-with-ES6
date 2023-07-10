/* eslint-disable import/named */
import Book from './modules/book.js';
import BookList from './modules/bookList.js';
import { DateTime } from './node_modules/luxon/src/luxon.js';

const bookList = new BookList();
const contain = document.querySelector('.list-book-body');

// show xurrent time
const currentTime = () => {
  const now = DateTime.now();
  const date = document.querySelector('.date p');
  date.textContent = now.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
};

setInterval(currentTime, 1000);

// display list of books
const display = () => {
  const books = bookList.getAll();

  contain.innerHTML = '';
  let currentColor = '#dddddd';
  books.forEach((book, i) => {
    const bookItem = `
      <div class="book-details">
        <p class="title">"${book.title}" by</p>
        <p class="author">${book.author}</p>
      </div>
      <button onclick="removeBook(${i})">Remove</button>
    `;

    const bookContainer = document.createElement('div');
    bookContainer.setAttribute('class', 'book');
    bookContainer.innerHTML = bookItem;
    if (currentColor !== bookContainer.style.backgroundColor) {
      bookContainer.style.backgroundColor = currentColor;
      currentColor = '';
    } else {
      currentColor = '#dddddd';
    }
    contain.appendChild(bookContainer);
  });
};

// remove a book
const removeBook = (index) => {
  bookList.remove(index);
  display();
};

window.removeBook = removeBook;

// add a book
const addBook = (book) => {
  bookList.add(book);
};

// add and display book list when submit
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = form.elements.title.value;
  const author = form.elements.author.value;
  addBook(new Book(title, author));

  display();
  form.reset();
});

window.addEventListener('load', () => {
  display();
});