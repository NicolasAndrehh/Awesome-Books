let bookList = [
  {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 3),
    title: 'Black Clover',
    author: 'Yuki Tabata',
  },
];

if (localStorage.getItem('books')) {
  bookList = JSON.parse(localStorage.getItem('books'));
}

if (localStorage.getItem('inputTitle')) {
  document.querySelector('.title-input').value = localStorage.getItem('inputTitle');
  document.querySelector('.author-input').value = localStorage.getItem('inputAuthor');
}

function showBooks() {
  const showBooksSection = document.querySelector('.show-books-section');
  let bookRow = '';
  if (bookList.length === 0) {
    showBooksSection.innerHTML = '<h1>Awesome books</h1>';
  } else {
    bookList.forEach((book) => {
      bookRow += `
                <p>${book.title}</p>
                <p>${book.author}</p>
                <button class="${book.id}">Remove</button>
                <hr>
            `;
      showBooksSection.innerHTML = `
                <h1>Awesome books</h1>
                ${bookRow}
            `;
    });
  }

  function removeBook(id) {
    bookList = bookList.filter((book) => book.id !== String(id));
    showBooks();
    localStorage.setItem('books', JSON.stringify(bookList));
  }

  const removeBookButton = document.querySelectorAll('.show-books-section button');
  removeBookButton.forEach((button) => {
    button.addEventListener('click', () => {
      removeBook(button.className);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => { showBooks(); });

function addBook(title, author) {
  bookList.push({
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 3),
    title,
    author,
  });
  showBooks();
  localStorage.setItem('books', JSON.stringify(bookList));
}

const addBookButton = document.querySelector('#add-book-button');
addBookButton.addEventListener('click', () => {
  const title = document.querySelector('.title-input').value;
  const author = document.querySelector('.author-input').value;
  if (title !== '' && author !== '') {
    addBook(title, author);
    localStorage.setItem('inputTitle', title);
    localStorage.setItem('inputAuthor', author);
  }
});
