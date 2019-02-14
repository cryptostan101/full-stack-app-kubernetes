
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const persons = require('./api');


// dbconfig
const db = require('./config').mongoURI;

// define server
const app = express();

// bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(bodyParser.text());
//app.use(bodyParser.json({ type: 'application/json'}));


// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err));

// serve static html file to user
app.get('/',(req, res) => {
  res.sendFile(path.join(__dirname,'./index.html'));
});

// api routes
app.use('/api', persons);


const port = process.env.PORT || 5000;

// const port = process.env.PORT || (process.argv[2] || 5000);


module.exports = app.listen(5000, () => console.log(`Server started on port http://localhost:${port}`));
