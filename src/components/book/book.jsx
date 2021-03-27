import React from "react";
import "./book.css"
import { BOOK_NAME_LENGTH, BOOK_AUTHOR_LENGTH, BOOK_DESCRIPTION_LENGTH } from "../../utils/contants";

// Form component to Add a new book or Edit a book
function Book(props) {

   // Event delegation
   function onTextUpdate(event) {
      if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
         const dataAttribute = event.target.dataset.bookMeta;
         switch (dataAttribute) {
            case "book-name":
               props.updateName(event.target.value);
               break;
            case "author-name":
               props.updateAuthor(event.target.value);
               break;
            case "book-published-on":
               props.updatePublishedOn(event.target.value);
               break;
            case "book-description":
               props.updateDescription(event.target.value);
               break;
            default:
               break;
         }
      }
   }

   // Event delegation
   function onFormClick(event) {
      if (event.target.tagName === "BUTTON") {
         const dataAttribute = event.target.dataset.action;
         switch (dataAttribute) {
            case "clear":
               props.clearBook();
               break;
            case "save":
               props.saveBook();
               break;
            default:
               break;
         }
         event.preventDefault();
      }
   }

   return (
      <form className="add-edit-book" onChange={onTextUpdate} onClick={onFormClick} onSubmit={(event) => event.preventDefault()}>
         <div><div>Book name: </div>
            <span><input data-book-meta="book-name" maxLength={BOOK_NAME_LENGTH} value={props.book.name}></input>
               <span className="counter">{props.book.name.length}/{BOOK_NAME_LENGTH}</span></span></div>
         <div><div>Author name: </div>
            <span><input data-book-meta="author-name" maxLength={BOOK_AUTHOR_LENGTH} value={props.book.author}></input>
               <span className="counter">{props.book.author.length}/{BOOK_AUTHOR_LENGTH}</span></span></div>
         <div><div>Published on: </div> <input data-book-meta="book-published-on" placeholder="DD-MM-YYYY" value={props.book.publishedOn}></input></div>
         <div><div>Description: </div><span><textarea data-book-meta="book-description" maxLength={BOOK_DESCRIPTION_LENGTH} value={props.book.description}></textarea>
            <span className="counter">{props.book.description.length}/{BOOK_DESCRIPTION_LENGTH}</span></span></div>
         <div className="button-container">
            <button data-action="clear">Clear</button> <button data-action="save">Save</button>
         </div>
      </form>
   );
}

export default Book;