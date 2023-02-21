export default class BookList {
  constructor() {
    this.Books = [];
  }

  addBook = (book) => {
    this.Books.push(book);
    this.showBooks();
  }

  removeBook = (id) => {
    this.Books = this.Books.filter((book) => book.id !== String(id));
    localStorage.setItem('books', JSON.stringify(this.getBooks()));
    this.showBooks();
  }

  localStorageBooks = (data) => {
    this.Books = data;
  }

  showBooks = () => {
    const showBooksSection = document.querySelector('.show-books-section');
    const booksTable = document.querySelector('.books-table');
    const tableContainer = document.querySelector('.table-container');
    let bookRow = '';

    if (this.Books.length === 0) {
      showBooksSection.innerHTML = '<h1>Awesome books</h1> <div class="table-container hide"><table class="books-table hide"></table></div>';
    } else {
      this.Books.forEach((book) => {
        booksTable.classList.remove('hide');
        tableContainer.classList.remove('hide');
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

  getBooks = () => this.Books
}
