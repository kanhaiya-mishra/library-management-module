class Book {
   constructor(book) {
      this.id = book && book._id || "";
      this.name = book && book._name || "";
      this.author = book && book._author || "";
      this.description = book && book._description || "";
      this.publishedOn = book && book._publishedOn || "";
      this.createdAt = book && book._createdAt || "";
   }

   set name(name) {
      this._name = name;
   }

   set author(author) {
      this._author = author;
   }

   set description(description) {
      this._description = description;
   }

   set id(id) {
      this._id = id;
   }

   set publishedOn(publishedOn) {
      this._publishedOn = publishedOn;
   }

   set createdAt(createdAt) {
      this._createdAt = createdAt;
   }

   get name() {
      return this._name;
   }

   get author() {
      return this._author;
   }

   get description() {
      return this._description;
   }

   get id() {
      return this._id;
   }

   get createdAt() {
      return this._createdAt;
   }

   get publishedOn() {
      return this._publishedOn;
   }
}

export default Book;