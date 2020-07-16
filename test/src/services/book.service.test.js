import { saveBook } from "../../../src/services/book.service";
import { Book } from "../../../src/models/Book.model";
import { book1 } from "../../fixtures/book";
import { expect } from "@jest/globals";
import mockingoose from "mockingoose";

test("initializes Book model with parameters and calls save method", async () => {
  const createdBook = await saveBook(book1);
  mockingoose(Book).toReturn(book1, "save");
  expect(Book.prototype.save).toBeCalledTimes(1);
  expect(createdBook).toStrictEqual(book1);
});
