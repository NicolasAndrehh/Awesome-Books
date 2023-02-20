import BookList from './modules/bookList.js';
import Book from './modules/book.js';
import { DateTime } from './modules/luxon.js';

const bookList = new BookList();
bookList.addBook(new Book('Black Clover', 'Yuki Tabata'));

// Local Storage
if (localStorage.getItem('books')) {
  bookList.localStorageBooks(JSON.parse(localStorage.getItem('books')));
}

document.addEventListener('DOMContentLoaded', () => bookList.showBooks());

if (localStorage.getItem('inputTitle')) {
  document.querySelector('.title-input').value = localStorage.getItem('inputTitle');
  document.querySelector('.author-input').value = localStorage.getItem('inputAuthor');
}

// Add book button event listener
const addBookButton = document.querySelector('#add-book-button');
const confirmationMessage = document.querySelector('.confirmation-message');
let cont = 1;
addBookButton.addEventListener('click', (e) => {
  const title = document.querySelector('.title-input').value;
  const author = document.querySelector('.author-input').value;
  if (title !== '' && author !== '') {
    e.preventDefault();
    bookList.addBook(new Book(title, author));
    localStorage.setItem('books', JSON.stringify(bookList.getBooks()));
    localStorage.setItem('inputTitle', title);
    localStorage.setItem('inputAuthor', author);
    confirmationMessage.innerHTML = `${cont} book(s) were added succesfully`;
    cont += 1;
  }
});

// Navigation
const showBooksSection = document.querySelector('.show-books-section');
const addBooksSection = document.querySelector('.add-books-section');
const contactSection = document.querySelector('.contact-section');

const showBookListSection = () => {
  addBooksSection.classList.add('hide');
  contactSection.classList.add('hide');
  showBooksSection.classList.remove('hide');
  confirmationMessage.innerHTML = '';
  cont = 1;
};

const showAddBookSection = () => {
  contactSection.classList.add('hide');
  showBooksSection.classList.add('hide');
  addBooksSection.classList.remove('hide');
};

const showContactSection = () => {
  addBooksSection.classList.add('hide');
  showBooksSection.classList.add('hide');
  contactSection.classList.remove('hide');
  confirmationMessage.innerHTML = '';
  cont = 1;
};

const bookListShowButton = document.querySelector('.book-list-show');
const addBookShowButton = document.querySelector('.add-book-show');
const contactShowButton = document.querySelector('.contact-show');

bookListShowButton.addEventListener('click', showBookListSection);
addBookShowButton.addEventListener('click', showAddBookSection);
contactShowButton.addEventListener('click', showContactSection);

// Display Date Time
const currentDateHTML = document.querySelector('.current-date');

setInterval(() => {
  const now = DateTime.now().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
  currentDateHTML.innerHTML = now;
}, 1000);