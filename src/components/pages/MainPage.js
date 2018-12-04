import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Shelf from "../Shelf";
import * as BooksAPI from '../../BooksAPI';

class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  // Lifecycle event to get books from API 
  componentDidMount() {
    BooksAPI.getAll()
    .then(res => {
      // console.log(res);
      this.setState({ books: res });
    });
  }

  // updateBook method for MainPage here
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(res => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    })
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            
            <Shelf updateBook={this.updateBook} name="Currently Reading" books={this.state.books.filter(b => b.shelf === "currentlyReading")} />
            <Shelf updateBook={this.updateBook} name="Plan to Read" books={this.state.books.filter(b => b.shelf === "wantToRead")} />
            <Shelf updateBook={this.updateBook} name="Finished Reading" books={this.state.books.filter(b => b.shelf === "read")} />
            
          </div>
        </div>
        <div className="open-search">
        <Link to="/search"><button>Add a book</button></Link>
        </div>
      </div>
    );
  }
}

export default MainPage;