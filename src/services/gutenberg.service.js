import xml2js from "xml2js";
import flat from "flat";

const flatten = flat.flatten;
const RDF_KEYS = {
  rdfRoot: "rdf:RDF",
  ebook: "pgterms:ebook",
  id: "$.rdf:about",
  title: "dcterms:title.0",
  author: "dcterms:creator.0.pgterms:agent.0.pgterms:name.0",
  publisher: "dcterms:publisher.0",
  language: "dcterms:language.0.rdf:Description.0.rdf:value.0._",
  publicationDate: "dcterms:issued.0._",
  subject: "dcterms:subject",
  rights: "dcterms:rights.0"
};

// ignoring multiple files in same
export const parseRDF = gutenbergRDFData =>
  parseRDFData(gutenbergRDFData).then(parsed => RDFToBook(parsed[0]));

const RDFToBook = book => {
  const flatted_ebook = flatten(book);
  return {
    id: parseInt(flatted_ebook[RDF_KEYS.id]?.replace("ebooks/", "")),
    title: flatted_ebook[RDF_KEYS.title],
    author: flatted_ebook[RDF_KEYS.author],
    publisher: flatted_ebook[RDF_KEYS.publisher],
    publicationDate: new Date(flatted_ebook[RDF_KEYS.publicationDate]),
    language: flatted_ebook[RDF_KEYS.language],
    subjects: book[RDF_KEYS.subject]?.map(
      subject => flatten(subject)["rdf:Description.0.rdf:value.0"]
    ),
    licenseRights: flatted_ebook[RDF_KEYS.rights]
  };
};

const parseRDFData = gutenbergRDFData =>
  xml2js
    .parseStringPromise(gutenbergRDFData)
    .then(parsed => parsed[RDF_KEYS.rdfRoot][RDF_KEYS.ebook])
    .catch(err => console.log(err));
