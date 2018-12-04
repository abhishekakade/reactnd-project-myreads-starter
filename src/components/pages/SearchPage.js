import React, { Component } from 'react';
import { Link } from "react-router-dom";
import * as BooksAPI from "../../BooksAPI";
import Book from "../Book";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      results: [],
      query: ""
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(res => {
      // console.log(res);
      this.setState({ books: res });
    });
  }

  updateQuery = (query) => {
    // this.setState({ query: query }, this.submitSearch); same as written below 
    this.setState({ query }, this.submitSearch);
  }

  // submitSearch() {
  //   if(this.state.query === "" || typeof this.state.query === "undefined") {
  //     return this.setState({ results: [] });
  //   }

  submitSearch() {
    let stateQuery = this.state.query;
    // console.log(typeof stateQuery);
    if(stateQuery.length === 0 || typeof stateQuery === "undefined" || stateQuery === null) {
      return this.setState({ results: [] });
    }

    BooksAPI.search(this.state.query)
    .then(res => {
      // console.log(res);
      if(res.error) {
        return this.setState({ results: [] });
      }
      
      else {
        let booksToBeFiltered = this.state.books;
        res.forEach(b => {
          let filteredBooks = booksToBeFiltered.filter(B => B.id === b.id);
          
          if(filteredBooks[0]) {
            // console.log("books found!", filteredBooks[0]);
            b.shelf = filteredBooks[0].shelf;
          }

        });
        return this.setState({ results: res });
      }
    }
    )
    // Catch and log error to the console 
    .catch(err => console.error(err));
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(resp => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    })
  }

  render() {

    // To show search status on page 
    let searchStatus;

    if (this.state.query === "") {
      searchStatus = (
        <p className="search-status">
          Type one or more keywords above to start searching...
        </p>
      );
    } else if (this.state.results.length === 0) {
      searchStatus = (
        <p className="search-status">
          No results found. Try different keywords...
        </p>
      );
    }
    // this idea taken from github.com/fernandobrito 

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" 
              autoFocus 
              value={this.state.query} 
              onChange={(e) => this.updateQuery(e.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">

          {/* Show searched books. updateBook here uses setState that rerenders state on change */}
          { 
            this.state.results.map((item, key) => <Book updateBook={this.updateBook} 
            key={key} book={item} />)
          }

          </ol>
        </div>
        {/* To show search status on page */}
        { searchStatus }
      </div>
    );
  }
}

export default SearchPage;