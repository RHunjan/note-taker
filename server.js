
const fs = require('fs');
const path = require('path');
const express = require('express');

const {notes} = require('./db/db');
const { stringify } = require('querystring');
 

const PORT = process.env.PORT || 3001;

const app = express();

//interprets the post request as json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//helps public files work - e.g., CSS
app.use(express.static('public'));


//create a new note

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}




app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    //set id
    req.body.id = notes.length.toString();

    //add note to notes array
    const newNote = createNewNote(req.body, notes);
    console.log(req.body);
    res.json(req.body);
});

//add html api routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get("/notes", (req,res) => {
  res.sendFile(path.join(__dirname, './public/notes.html' ));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});





app.listen(PORT, () => {
    console.log('this is working');
 
});