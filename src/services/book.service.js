import { Book } from "../models/Book.model.js";

export const saveBook = bookObject =>
  new Book(bookObject).save().then(() => bookObject);
