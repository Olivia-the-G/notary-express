// libraries 
const express = require('express');
const path = require('path');
const fs = require('fs');

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
app.get('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  res.json(notes);
});

// post request for saving new notes to database
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  newNote.id = notes.length + 1;
  notes.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json(newNote);
});

// TODO: make it possible to delete notes 
// app.delete('/api/notes/:id', (req, res) => {
//   const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
//   const noteId = req.params.id;
//   const index = notes.findIndex(note => note.id === noteId)
//   revNotes = notes.splice(index, 1);
//   fs.writeFileSync('./db/db.json', JSON.stringify(notes));
//   res.json(revNotes);
// });

// above code doesn't work properly 