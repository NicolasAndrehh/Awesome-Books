import BookList from './class/bookList.js';
import Book from './class/book.js';

const bookList = new BookList();
bookList.addBook(new Book('Black Clover', 'Yuki Tabata'));

if (localStorage.getItem('books')) {
  bookList.localStorageBooks(JSON.parse(localStorage.getItem('books')));
}

document.addEventListener('DOMContentLoaded', () => bookList.showBooks());

if (localStorage.getItem('inputTitle')) {
  document.querySelector('.title-input').value = localStorage.getItem('inputTitle');
  document.querySelector('.author-input').value = localStorage.getItem('inputAuthor');
}

const addBookButton = document.querySelector('#add-book-button');
addBookButton.addEventListener('click', (e) => {
  const title = document.querySelector('.title-input').value;
  const author = document.querySelector('.author-input').value;
  if (title !== '' && author !== '') {
    e.preventDefault();
    bookList.addBook(new Book(title, author));
    localStorage.setItem('books', JSON.stringify(bookList.getBooks()));
    localStorage.setItem('inputTitle', title);
    localStorage.setItem('inputAuthor', author);
  }
});
