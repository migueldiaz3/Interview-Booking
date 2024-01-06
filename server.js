const express = require('express');
const mysql = require('mysql');
const app = express();
// app.use("/assets",express.static("assets"));


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Babbu@333',
  database: 'newschema',
});


db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
  const createTableQuery = `CREATE TABLE IF NOT EXISTS interview1 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    time DATETIME NOT NULL
  )`;
  db.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log('Table created or already exists');
  });
});


app.use(express.urlencoded({ extended: true }));
app.post('/bookInterview', (req, res) => {
  const { name, email, time } = req.body;
  const insertQuery = 'INSERT INTO interview1 (name, email, time) VALUES (?, ?, ?)';
  db.query(insertQuery, [name, email, time], (err, result) => {
    if (err) throw err;
    console.log('Interview booked');
    res.redirect('/');
  });
});


app.get('/getInterviews', (req, res) => {
  const selectQuery = 'SELECT * FROM interview1';
  db.query(selectQuery, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
