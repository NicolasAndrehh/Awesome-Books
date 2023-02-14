export default class BookList {
  constructor() {
    this.Books = [];
  }

  addBook(book) {
    this.Books.push(book);
    this.showBooks();
  }

  removeBook(id) {
    this.Books = this.Books.filter((book) => book.id !== String(id));
    localStorage.setItem('books', JSON.stringify(this.getBooks()));
    this.showBooks();
  }

  localStorageBooks(data) {
    this.Books = data;
  }

  showBooks() {
    const showBooksSection = document.querySelector('.show-books-section');
    const booksTable = document.querySelector('.books-table');
    let bookRow = '';

    if (this.Books.length === 0) {
      showBooksSection.innerHTML = '<h1>Awesome books</h1> <table class="books-table"></table>';
      booksTable.classList.remove('show');
      booksTable.classList.add('hide');
    } else {
      booksTable.classList.remove('hide');
      booksTable.classList.add('show');
      this.Books.forEach((book) => {
        bookRow += `
                  <tr>
                    <td><p>"${book.title}" by ${book.author}</p></td>
                    <td><button class="${book.id}">Remove</button></td>
                  </tr>
              `;
        booksTable.innerHTML = `${bookRow}`;
      });
    }

    const removeBookButton = document.querySelectorAll('.show-books-section button');
    removeBookButton.forEach((button) => {
      button.addEventListener('click', () => {
        this.removeBook(button.className);
      });
    });
  }

  getBooks() {
    return this.Books;
  }
}
