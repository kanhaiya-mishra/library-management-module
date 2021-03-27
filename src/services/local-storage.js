// Store books in local storage
class LocalStorageService {
   static setBooks(books) {
      localStorage.setItem('books', JSON.stringify(books));
   }

   static getBooks() {
      let books = localStorage.getItem('books');
      if (books) {
         return JSON.parse(books);
      } else {
         return [];
      }
   }
}

export default LocalStorageService;