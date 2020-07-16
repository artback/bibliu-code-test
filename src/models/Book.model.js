import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, min: 1 },
    title: { type: String, index: true, required: true },
    author: { type: String, index: true, required: true },
    publisher: String,
    publicationDate: { type: Date, index: true },
    language: String,
    subjects: [String],
    licenseRights: String
  },
  {
    timestamps: true,
    message: props => ` Property ${props.path} is required '`
  }
);

const Book = mongoose.model("Book", BookSchema);
export { Book };
