import dotenv from "dotenv";
import readdirp from "readdirp";
import path from "path";
const join = path.join;
import { connect } from "./database.js";

import { parseAndSaveBook } from "./parse.js";
import fs from "fs";

dotenv.config();

const directoryPath = process.argv[2];
connect({
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
  db: process.env.MONGO_DB
}).then(async () => {
  for await (const entry of readdirp(directoryPath, {
    fileFilter: "*.rdf"
  })) {
    const { path } = entry;
    try {
      const fileContent = fs.readFileSync(join(directoryPath, path));
      const book = await parseAndSaveBook(fileContent);
      console.log(`${book.title}: Parsed and Saved`);
    } catch (err) {
      console.error(err);
    }
  }
  process.exit(0);
});
