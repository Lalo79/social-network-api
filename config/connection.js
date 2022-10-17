const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialNetwordDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
