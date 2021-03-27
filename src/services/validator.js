import { BOOK_NAME_LENGTH, BOOK_AUTHOR_LENGTH, BOOK_DESCRIPTION_LENGTH } from "../utils/contants";

class Validator {

   validateBook(bookObj) {
      return (this.validateName(bookObj.name) && this.validateAuthor(bookObj.author)
         && this.validatePublishedOn(bookObj.publishedOn) && this.validateDescription(bookObj.description));
   }

   validateName(name) {
      if (typeof name !== 'string') {
         alert("Name is not of type String");
         return false;
      }

      if (name.length === 0) {
         alert("Name cannot be left blank");
         return false;
      }

      if (name.length > BOOK_NAME_LENGTH) {
         alert(`Name should not exceed more than ${BOOK_NAME_LENGTH} characters`);
         return false;
      }

      return true;
   }

   validateAuthor(author) {
      if (typeof author !== 'string') {
         alert("Author is not of type String");
         return false;
      }

      if (author.length === 0) {
         alert("Author name cannot be left blank");
         return false;
      }

      if (author.length > BOOK_AUTHOR_LENGTH) {
         alert(`Author should not exceed more than ${BOOK_AUTHOR_LENGTH} characters`);
         return false;
      }

      return true;
   }

   validatePublishedOn(publishedOn) {
      if (typeof publishedOn !== 'string') {
         alert("Published on is not of type String");
         return false;
      }

      if (publishedOn === 0) {
         alert("Publish date cannot be left blank");
         return false;
      }

      // Validation code from - https://www.w3resource.com/javascript/form/javascript-date-validation.php

      var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
      // Match the date format through regular expression
      if (publishedOn.match(dateformat)) {
         var pdate = publishedOn.split('-');
         var dd = parseInt(pdate[0]);
         var mm = parseInt(pdate[1]);
         var yy = parseInt(pdate[2]);
         // Create list of days of a month [assume there is no leap year by default]
         var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
         if (mm == 1 || mm > 2) {
            if (dd > ListofDays[mm - 1]) {
               alert('Invalid Published on date format!');
               return false;
            }
         }
         if (mm == 2) {
            var lyear = false;
            if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
               lyear = true;
            }
            if ((lyear == false) && (dd >= 29)) {
               alert('Invalid Published on date format!');
               return false;
            }
            if ((lyear == true) && (dd > 29)) {
               alert('Invalid Published on date format!');
               return false;
            }
         }
      }
      else {
         alert("Invalid Published on date format!");
         return false;
      }
      return true;
   }

   validateDescription(description) {
      if (typeof description !== 'string') {
         alert("Description is not of type String");
         return false;
      }

      if (description.length > BOOK_DESCRIPTION_LENGTH) {
         alert(`Description should not exceed more than ${BOOK_DESCRIPTION_LENGTH} characters`);
         return false;
      }

      return true;
   }
}

export default Validator;