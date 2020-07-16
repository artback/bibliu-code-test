import fs from "fs";
import { join } from "path";
import { parseRDF } from "../../../src/services/gutenberg.service.js";
import { book1, book2 } from "../../fixtures/book.js";
import { expect } from "@jest/globals";

test("parses values correctly", async () => {
  const fileContent = fs.readFileSync(
    join(__dirname, "..", "..", "fixtures", "book-1.rdf"),
    "utf8"
  );
  const parsedBook = await parseRDF(fileContent);
  expect(parsedBook).toStrictEqual(book1);
});

test("parses values correctly when special cases values are present (title is an array) in the RDF file", async () => {
  const fileContent = fs.readFileSync(
    join(__dirname, "..", "..", "fixtures", "book-2.rdf"),
    "utf8"
  );
  const parsedBook = await parseRDF(fileContent);
  expect(parsedBook).toStrictEqual(book2);
});
