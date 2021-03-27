import React from "react";
import { connect } from "react-redux";
import Book from "../../components/book/book"
import "./edit-book.css";

class EditBook extends React.Component {

   constructor(props) {
      super(props);
      this.backToBookList = this.backToBookList.bind(this);
   }

   componentDidMount() {
      this.props.setBookById(this.props.match.params.bookId);
   }

   backToBookList() {
      this.props.clearBook();
      this.props.history.push("/all-books");
   }

   render() {
      if (!this.props.book) {
         return (
            <article>
               <div>
                  Sorry we couldn't find the book you are looking for.
            </div>
               <button onClick={this.backToBookList}>Back to book list page</button>
            </article>

         )
      } else {
         return (
            <section id="edit-book">
               <Book
                  book={this.props.book}
                  saveBook={this.props.saveBook}
                  clearBook={this.props.clearBook}
                  updateName={this.props.updateName}
                  updateAuthor={this.props.updateAuthor}
                  updateDescription={this.props.updateDescription}
                  updatePublishedOn={this.props.updatePublishedOn} >

               </Book>
               <button onClick={this.backToBookList}>Back to book list page</button>
            </section>
         )
      }
   }
}

function mapStateToProps(state) {
   return {
      book: state.book
   }
}

function mapDispatchToProps(dispatch) {
   return {
      setBookById: (id) => dispatch({ type: 'SET_BOOK_BY_ID', payload: id }),
      saveBook: () => dispatch({ type: 'SAVE_BOOK' }),
      clearBook: () => dispatch({ type: 'CLEAR_BOOK' }),
      updateName: (name) => dispatch({ type: 'UPDATE_NAME', payload: name }),
      updateAuthor: (author) => dispatch({ type: 'UPDATE_AUTHOR', payload: author }),
      updateDescription: (description) => dispatch({ type: 'UPDATE_DESCRIPTION', payload: description }),
      updatePublishedOn: (publishedOn) => dispatch({ type: 'UPDATE_PUBLISHED_ON', payload: publishedOn })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBook);