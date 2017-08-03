const sqlite3 = require('sqlite3').verbose();
const data = require('./app/data/projects.json');

var db = new sqlite3.Database('database.sqlite');

db.serialize(function() {
  db.run('CREATE TABLE projects(title TEXT, city TEXT, country TEXT, due TEXT, poc DATE, notes TEXT)');

  var stmt = db.prepare('INSERT INTO projects VALUES (?, ?, ?, ?, ?, ?)');

  data.forEach(object => {
    stmt.run(object.title, object.city, object.country, object.due, object.poc, object.notes);
  });
  stmt.finalize();
});

db.close();
