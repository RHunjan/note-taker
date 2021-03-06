
const fs = require('fs');
const path = require('path');
const express = require('express');
const short = require('shortid');

const {notesArray} = require('./db/db');


 

const PORT = process.env.PORT || 3001;
const app = express();


//interprets the post request as json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//helps public files work - e.g., CSS
app.use(express.static('public'));


//apis
app.get('/api/notes', (req, res) => {
res.json(notesArray);
    
});

//create a new note

function createNewNote(body, notesArray) {
  const newNote = body;

  notesArray.push(newNote);
  var id = short();
  body.id =  id;
  //write to db.json file
    fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({notesArray }, null, 2)
  );
  return newNote;
}

app.post('/api/notes', (req, res) => {
  
    //add note to notes array
    const newNote = createNewNote(req.body, notesArray);
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