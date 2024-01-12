// libraries 
const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

const app = express();

// listening port 
const PORT = process.env.PORT || 3000;

// middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// confirmation for starting the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// html routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// api routes 
app.get('/api/notes', (req, res) => res.json(notes));

// post request for saving new notes to database
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = notes.length + 1;
  notes.push(newNote);
  fs.writeFileSync('./db/db.json', newNote);
  res.json(newNote);
});

// TODO: Make it possible to edit notes 

// TODO: make it possible to delete notes 