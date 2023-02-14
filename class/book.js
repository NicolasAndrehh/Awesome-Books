export default class Book {
  constructor(title, author) {
    this.id = Date.now().toString(36) + Math.random().toString(36).substr(2, 3);
    this.title = title;
    this.author = author;
  }
}