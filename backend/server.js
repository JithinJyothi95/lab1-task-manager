const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'mysql-db',
  user: process.env.DB_USER || 'myuser',
  port: process.env.DB_PORT || 3306,
  password: process.env.DB_PASSWORD || 'myuserpass',
  database: process.env.DB_NAME || 'mytasksdb'
});

// Retry connection if MySQL is not ready
const connectWithRetry = () => {
  db.connect((err) => {
    if (err) {
      console.error("MySQL not ready, retrying in 5s...", err.message);
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("Connected to MySQL");
    }
  });
};

connectWithRetry();

// GET all tasks
app.get('/api/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// POST a new task
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  db.query('INSERT INTO tasks (title) VALUES (?)', [title], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId });
  });
});

// Mark task as complete
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.query('UPDATE tasks SET completed = TRUE WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.sendStatus(200);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
