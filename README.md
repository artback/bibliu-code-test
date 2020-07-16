# BibliU code test 

## Technology stack

Node.js application for parsing and storing metadata from the Project Gutenberg.

Storage in MongoDB (Mongoose). 

## Project Setup

### App Configuration

A default env file called `.env` is provided. You could change it to fit your mongodb instance.  


### Install dependencies

```
npm install
```

### Run application

After making sure you have correct values in your **.env** file and database started you can run the script.

```
npm start <file_directory>
```

**FILE_PATH** should be local path to the downloaded unzipped RDF files from the Project Gutenberg.
Files will be read recursive. 

## Project structure

In the project structure we have the following parts:

```
|- src
 |- models/
 |- services/
|- test/
```

`models` folder contains the `Book` mongoose model.

`services` folder contains services required for our parser to work properly. It includes Gutenberg service , book service.

`test` folder contains unit tests for the services.

## TESTING 

Use **Jest** for tests and **Istanbul** for running tests coverage.

### Run test 

To run tests, run:

```
npm test
```

To check tests coverage, run:

```
npm test:coverage
```
