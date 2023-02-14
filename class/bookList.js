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
    let bookRow = '';

    if (this.Books.length === 0) {
      showBooksSection.innerHTML = '<h1>Awesome books</h1>';
    } else {
      this.Books.forEach((book) => {
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