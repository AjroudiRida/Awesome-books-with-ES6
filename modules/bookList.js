export default class BookList {
  constructor() {
    this.bookList = [];
    this.localStorage = window.localStorage;
  }

  add(book) {
    if (book) {
      this.bookList.push(book);
      this.localStorage.setItem('books', JSON.stringify(this.bookList));
    }
  }

  remove(index) {
    this.bookList = this.bookList.filter((book) => book.title !== this.bookList[index].title);
    this.localStorage.setItem('books', JSON.stringify(this.bookList));
  }

  getAll() {
    const data = this.localStorage.getItem('books');

    if (data) {
      this.bookList = JSON.parse(data);
    } else {
      this.bookList = [];
    }
    return this.bookList;
  }
}