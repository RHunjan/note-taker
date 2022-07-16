const fs = require('fs');
const path = require('path');
const express = require('express');

const {notes} = require('./db/db');
 

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
    res.json(notes);
});


app.listen(PORT, () => {
    console.log('this is working');
 
});