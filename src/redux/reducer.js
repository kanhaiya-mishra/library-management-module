import LocalStorageService from "../services/local-storage";
import Book from "../utils/book";
import { v4 as generateId } from 'uuid';
import Validator from "../services/validator";

const validator = new Validator();

// Saving books in localstorage
// Initializing books from localstorage
// filteredBooks is for search results

let initialState = {
   books: LocalStorageService.getBooks(),
   book: new Book(),
   filteredBooks: []
};

const reducer = (state = initialState, action) => {
   let newState;
   let newBooks;
   let newBook;
   switch (action.type) {
      case 'SET_BOOK_BY_ID':
         // In case of edit book, state.book becomes the book user is looking for
         newBook = state.books.filter((book) => {
            return book._id === action.payload;
         })
         newBook = newBook.length > 0 ? new Book(newBook[0]) : undefined;
         newState = {
            ...state,
            book: newBook
         }
         return newState;
      case 'ADD_BOOK':
         // Validate book entries before adding it to the list
         if (!validator.validateBook(state.book)) {
            return state;
         }
         state.book.id = generateId();
         state.book.createdAt = new Date();
         newBooks = [...state.books];
         newBooks.unshift(state.book);
         newState = {
            ...state,
            book: new Book(),
            books: newBooks
         }
         LocalStorageService.setBooks(newState.books);
         alert("Book has been saved successfully.");
         return newState;
      case 'UPDATE_NAME':
         newBook = new Book(state.book);
         newBook.name = action.payload;
         newState = {
            ...state,
            book: newBook
         }
         return newState;
      case 'UPDATE_AUTHOR':
         newBook = new Book(state.book);
         newBook.author = action.payload;
         newState = {
            ...state,
            book: newBook
         }
         return newState;
      case 'UPDATE_DESCRIPTION':
         newBook = new Book(state.book);
         newBook.description = action.payload;
         newState = {
            ...state,
            book: newBook
         }
         return newState;
      case 'UPDATE_PUBLISHED_ON':
         newBook = new Book(state.book);
         newBook.publishedOn = action.payload;
         newState = {
            ...state,
            book: newBook
         }
         return newState;
      case 'SAVE_BOOK':
         // Update book details
         if (!validator.validateBook(state.book)) {
            return state;
         }
         newBooks = state.books.map(book => {
            if (state.book._id === book._id) {
               return new Book(state.book);
            } else {
               return book;
            }
         });
         newState = {
            ...state,
            books: newBooks
         }
         LocalStorageService.setBooks(newState.books);
         alert("Book has been updated successfully.");
         return newState;
      case 'CLEAR_BOOK':
         newState = {
            ...state,
            book: new Book()
         }
         return newState;
      case 'DELETE_BOOK':
         newBooks = state.books.filter((book) => {
            return book._id !== action.payload;
         })
         newState = {
            ...state,
            books: newBooks
         }
         LocalStorageService.setBooks(newState.books);
         return newState;
      case 'SEARCH_BOOKS':
         // If user searches with AND operator, we try to find all matching params in a book
         if (action.payload.operator === "AND") {
            newBooks = state.books.filter((book) => {
               if (action.payload.name.length > 0 && !book._name.includes(action.payload.name)) {
                  return false;
               }
               if (action.payload.authorName.length > 0 && !book._author.includes(action.payload.authorName)) {
                  return false;
               }
               if (action.payload.publishedOn.length > 0 && book._publishedOn !== action.payload.publishedOn) {
                  return false;
               }
               if (action.payload.description.length > 0 && !book._description.includes(action.payload.description)) {
                  return false;
               }
               if (action.payload.count && book._count !== action.payload.count) {
                  return false;
               }
               return true;
            });
            newState = {
               ...state,
               filteredBooks: newBooks
            }
         } else if (action.payload.operator === "OR") {
            // If user searches with OR operator, we try to find any matching params in a book
            newBooks = state.books.filter((book) => {
               if (action.payload.name.length > 0 && book._name.includes(action.payload.name)) {
                  return true;
               }
               if (action.payload.authorName.length > 0 && book._author.includes(action.payload.authorName)) {
                  return true;
               }
               if (book._publishedOn === action.payload.publishedOn) {
                  return true;
               }
               if (action.payload.description.length > 0 && book._description.includes(action.payload.description)) {
                  return true;
               }
               if (book._count === action.payload.count) {
                  return true;
               }
               return false;
            })
            newState = {
               ...state,
               filteredBooks: newBooks
            }
         } else {
            // If we dont get any valid operator, show nothing
            newState = {
               ...state,
               filteredBooks: []
            }
         }
         return newState;
      default:
         LocalStorageService.setBooks(state.books);
         return state;
   }
}

export default reducer;