import React from "react";
import { connect } from "react-redux";
import Book from "../../components/book/book"
import "./add-book.css";

class AddBook extends React.Component {
   render() {
      return (
         <section id="add-book">
            <Book
               book={this.props.book}
               saveBook={this.props.saveBook}
               clearBook={this.props.clearBook}
               updateName={this.props.updateName}
               updateAuthor={this.props.updateAuthor}
               updateDescription={this.props.updateDescription}
               updatePublishedOn={this.props.updatePublishedOn} >

            </Book>
         </section>
      )
   }
}

function mapStateToProps(state) {
   return {
      book: state.book
   }
}

function mapDispatchToProps(dispatch) {
   return {
      saveBook: () => dispatch({ type: 'ADD_BOOK' }),
      clearBook: () => dispatch({ type: 'CLEAR_BOOK' }),
      updateName: (name) => dispatch({ type: 'UPDATE_NAME', payload: name }),
      updateAuthor: (author) => dispatch({ type: 'UPDATE_AUTHOR', payload: author }),
      updateDescription: (description) => dispatch({ type: 'UPDATE_DESCRIPTION', payload: description }),
      updatePublishedOn: (publishedOn) => dispatch({ type: 'UPDATE_PUBLISHED_ON', payload: publishedOn })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);