const express = require('express');
const bodyParser = require('body-parser');
const Promise = require('promise');
const app = express();
const path = require('path');

const dbConfig = require('./app/config/database.js');
const mongoose = require('mongoose');



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');
require('./app/config/routes.config.js')(app);

mongoose.Promise = global.Promise;

	// Connecting to the database
	mongoose.connect(dbConfig.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
	}).then(() => {
	    console.log("Successfully connected to the database");    
	}).catch(err => {
	    console.log('Could not connect to the database. Exiting now...', err);
	    process.exit();
    });
    
app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});