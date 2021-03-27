import React from "react";
import "./search.css";
import { connect } from "react-redux";
import BookCard from "../../components/book-card/book-card";

class Search extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         name: "",
         authorName: "",
         publishedOn: "",
         count: "",
         description: "",
         operator: "",
         showResults: false
      }
      this.setSearchState = this.setSearchState.bind(this);
      this.onTextUpdate = this.onTextUpdate.bind(this);
      this.onFormClick = this.onFormClick.bind(this);
      this.createQueryStringURL = this.createQueryStringURL.bind(this);
      this.editBook = this.editBook.bind(this);
      this.deleteBook = this.deleteBook.bind(this);
   }

   componentDidMount() {
      this.setSearchState();
   }

   componentDidUpdate(prevProps) {
      if (prevProps.location.search !== this.props.location.search) {
         this.setSearchState();
      }
   }

   setSearchState() {
      let search = this.props.location.search;
      if (search && search.length > 0) {
         const url = new URL(
            window.location.href
         );
         this.setState({
            name: url.searchParams.get('name'),
            authorName: url.searchParams.get('authorName'),
            publishedOn: url.searchParams.get('publishedOn'),
            count: url.searchParams.get('count'),
            description: url.searchParams.get('description'),
            operator: url.searchParams.get('operator'),
            showResults: url.searchParams.get('showResults')
         }, function callBack() {
            if (this.state.showResults) {
               this.props.searchBooks(this.state);
            }
         });
      } else {
         this.setState({
            name: "",
            authorName: "",
            publishedOn: "",
            count: "",
            description: "",
            operator: "",
            showResults: false
         })
      }
   }

   createQueryStringURL() {
      var esc = encodeURIComponent;
      var query = Object.keys(this.state)
         .map(k => esc(k) + '=' + esc(this.state[k]))
         .join('&');

      return query;
   }

   onTextUpdate(event) {
      if (event.target.tagName === "INPUT" ||
         event.target.tagName === "TEXTAREA" ||
         event.target.tagName === "RADIO" ||
         event.target.tagName === "LABEL") {
         const dataAttribute = event.target.dataset.bookMeta;
         switch (dataAttribute) {
            case "book-name":
               this.setState({
                  name: event.target.value
               });
               break;
            case "author-name":
               this.setState({
                  authorName: event.target.value
               });
               break;
            case "book-published-on":
               this.setState({
                  publishedOn: event.target.value
               });
               break;
            case "book-description":
               this.setState({
                  description: event.target.value
               });
               break;
            case "radio-and":
               this.setState({
                  operator: "AND"
               });
               break;
            case "radio-or":
               this.setState({
                  operator: "OR"
               });
               break;
            default:
               break;
         }
      }
   }

   onFormClick(event) {
      if (event.target.tagName === "BUTTON") {
         const dataAttribute = event.target.dataset.action;
         switch (dataAttribute) {
            case "clear":
               this.props.history.push("/search-books");
               break;
            case "search":
               this.setState({
                  showResults: true
               }, function callBack() {
                  let queryURL = this.createQueryStringURL();
                  this.props.history.push("/search-books?" + queryURL);
               });
               break;
            default:
               break;
         }
         event.preventDefault();
      }
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
         <section id="search">
            <div className="search-text">
               Search books by:
            </div>
            <form className="search-book" onChange={this.onTextUpdate} onClick={this.onFormClick} onSubmit={(event) => event.preventDefault()}>
               <div>
                  <div>Search type:</div>
                  <div className="radio-container">
                     <input type="radio" id="AND" data-book-meta="radio-and" checked={this.state.operator === "AND"} name="search-type" value="AND" />
                     <label htmlFor="AND" data-book-meta="radio-and">AND</label>
                     <input type="radio" data-book-meta="radio-or" id="OR" checked={this.state.operator === "OR"} name="search-type" value="OR" />
                     <label data-book-meta="radio-or" htmlFor="OR">OR</label>
                  </div>
               </div>

               <div><div>Book name: </div> <input data-book-meta="book-name" value={this.state.name}></input>
               </div>
               <div><div>Author name: </div> <input data-book-meta="author-name" value={this.state.authorName}></input>
               </div>
               <div><div>Published on: </div> <input data-book-meta="book-published-on" placeholder="DD-MM-YYYY" value={this.state.publishedOn}></input></div>
               <div><div>Description: </div> <textarea data-book-meta="book-description" value={this.state.description}></textarea>
               </div>
               <div className="button-container">
                  <button data-action="clear">Clear</button> <button data-action="search">Search</button>
               </div>
            </form>
            {this.state.showResults && this.props.books.length > 0 &&
               <div className="result-container">
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
               </div>
            }
            {this.state.showResults && this.props.books.length === 0 &&
               <div>
                  Sorry, we couldn't find any books with that keyword combination.
               </div>
            }
         </section>
      )
   }
}

function mapStateToProps(state) {
   return {
      books: state.filteredBooks
   }
}

function mapDispatchToProps(dispatch) {
   return {
      searchBooks: (searchParams) => dispatch({ type: 'SEARCH_BOOKS', payload: searchParams }),
      deleteBook: (id) => dispatch({ type: 'DELETE_BOOK', payload: id }),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);