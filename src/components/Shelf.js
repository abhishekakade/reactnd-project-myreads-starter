import React from 'react';
import Book from "./Book";

const Shelf= ({ name, books, updateBook }) => {

  // componentDidMount() {
  //   console.log(this, "Shelf mounted");
  // }

  return (
    <div className="bookshelf" style={{ textAlign: "center" }}>
      <h2 className="bookshelf-title">{name}</h2>
      {/* {console.log({name})} */}
      <div className="bookshelf-books">
        <ol className="books-grid">

          {/* updateBook Props From SearchPage Component */}
          {
            books.map((book, key) => 
              (<Book updateBook={updateBook} book={book} key={key} />) 
            )
          }

        </ol>
      </div>
    </div>
  );
}

export default Shelf;
