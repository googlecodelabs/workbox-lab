const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();

var db = new sqlite3.Database('database.sqlite');

// This serves static files from the specified directory
app.use(express.static(__dirname + '/app'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get(['/', '/index.html'], function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/getAll', function(req, res) {
  db.all('SELECT * FROM projects', function(err, rows) {
    if (err) {
      res.send('there was an error');
      return;
    }
    res.send(rows);
  });
});

app.post('/api/add', function(req, res) {
  res.send('test success');
  res.status(500).send('test failure');
});

const server = app.listen(8081, function() {

  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
