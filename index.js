const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const cwd = process.cwd();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Current directory: ${cwd()}. \n API server running on port ${PORT}!`);
    });
  });