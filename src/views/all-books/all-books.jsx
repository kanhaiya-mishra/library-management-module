import React from "react";
import { connect } from "react-redux";
// import Loader from "../../components/loader/loader";
import BookCard from "../../components/book-card/book-card";
import "./all-books.css";

class AllBooks extends React.Component {

   constructor(props) {
      super(props);
      this.editBook = this.editBook.bind(this);
      this.deleteBook = this.deleteBook.bind(this);
   }

   editBook(id) {
      this.props.history.push("/edit-book/" + id);
   }

   deleteBook(id) {
      let deleteBook = confirm("Are you sure you want to delete this book ?");
      if (deleteBook) {
         this.props.deleteBook(id);
      }
   }

   render() {
      return (
         <section id="all-books">
            {/* <Loader showLoader={this.state.showLoader} /> */}
            {this.props.books.map((book) => {
               return (
                  <BookCard
                     key={book.id}
                     book={book}
                     editBook={this.editBook}
                     deleteBook={this.deleteBook}
                  />
               )
            })}
            {this.props.books.length === 0 &&
               <div>Sorry, we could not find any books! Click <a href="/add-book">here</a> to add a new book.</div>
            }
         </section>
      )
   }
}

function mapStateToProps(state) {
   return {
      books: state.books
   }
}

function mapDispatchToProps(dispatch) {
   return {
      deleteBook: (id) => dispatch({ type: 'DELETE_BOOK', payload: id }),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks);