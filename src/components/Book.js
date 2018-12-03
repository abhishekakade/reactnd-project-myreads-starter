import React, { Component } from 'react';

class Book extends Component {

  // componentDidMount() {
  //   console.log(this);
  // }

  render() {
    return (
      <li>
        <div className="book" 
          style={{ padding: "20px", paddingTop: "1.5em", width: "200px"}}
        >
          <div className="book-top">
            <div title="Book Cover" className="book-cover" 
              style={{ border: "2px solid #333", borderRadius:"10px", 
                width: 132, height: 200, 
                // Added parenthesis around && to fix no mixed operators error 
                backgroundImage: `url("${(this.props.book.imageLinks && this.props.book.imageLinks.thumbnail) || "No image found!"}")` }}>
            </div>
            <div className="book-shelf-changer">
              <select 
                value={this.props.book.shelf || "none"} 
                // updateBook Props From SearchPage Component 
                onChange={(e) => this.props.updateBook(this.props.book, e.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Plan to Read</option>
                <option value="read">Finished Reading</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">
            {this.props.book.title}
          </div>
          <div className="book-authors" 
            style={{ paddingTop: "5px", lineHeight: "1.1" }}>
            {/* Added parenthesis around && to fix no mixed operators error */}
            {(this.props.book.authors && this.props.book.authors[0]) || "Anonymous"}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;


















