import React, { Component } from 'react'
import Book from "./Book";

class Shelf extends Component {

  // componentDidMount() {
  //   console.log(this, "Shelf mounted");
  // }

  render() {
    return (
      <div className="bookshelf" style={{ textAlign: "center" }}>
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

            {/* updateBook Props From SearchPage Component */}
            {
              this.props.books.map((book, key) => 
                (<Book updateBook={this.props.updateBook} book={book} key={key} />) 
              )
            }

          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;
