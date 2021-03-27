import React from "react";
import "./book-card.css";

function BookCard(props) {
   return (
      <article className="card" id={props.book._id} key={props.book._id}>
         <div className="card-container">
            <div className="book-header"><div className="ellipsis" title={props.book._name}>{props.book._name}</div>
               <div className="button-container"><button onClick={() => props.editBook(props.book._id)} className="edit-button">Edit</button><button onClick={() => props.deleteBook(props.book._id)}>Delete</button></div></div>
            <span className="book-author ellipsis" title={props.book._author}>Author: {props.book._author}</span>
            <time className="book-time">Published on: {props.book._publishedOn}</time>
            <div className="book-description">
               {props.book._description}
            </div>
         </div>
      </article>
   );
}

export default BookCard;