// modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// instantiate express
const app = express();

// ### MIDDLEWARE ###

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static resources
app.use(express.static('public'));
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.use('/lib', express.static(path.join(__dirname, '..', 'lib')));
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

// grab files
const index = path.join(__dirname, '..', 'public', 'index.html');
const pageNotFound = path.join(__dirname, '..', 'public', '404.html');

// ### MAIN ROUTES ###
app.get('/', (req, res, next) => {
  res.sendFile(index);
});

// ### ERROR HANDLING ###
app.use((req, res, next) => {
  res.status(404).sendFile(pageNotFound);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send('<h1>There was an Error<h1>');
});

module.exports = app;
