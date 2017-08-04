const sqlite3 = require('sqlite3').verbose();
const projects = require('./app/data/projects.json');

const db = new sqlite3.Database('database.sqlite');

db.serialize(function() {
  db.run('CREATE TABLE projects(title TEXT, city TEXT, country TEXT, due TEXT, poc DATE, notes TEXT)');

  let stmt = db.prepare('INSERT INTO projects VALUES (?, ?, ?, ?, ?, ?)');

  projects.forEach(project => {
    stmt.run(project.title, project.city, project.country, project.due, project.poc, project.notes);
  });
  stmt.finalize();
});

db.close();
