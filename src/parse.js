import { saveBook } from "./services/book.service.js";
import { parseRDF } from "./services/gutenberg.service.js";

export const parseAndSaveBook = file =>
  parseRDF(file).then(parsed => saveBook(parsed));
