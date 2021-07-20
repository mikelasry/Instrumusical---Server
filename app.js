// web app framework for node.js
const express = require('express');
// pars incoming request bodies in a middleware before the handlers
const bodyParser = require('body-parser');
// cross-origin resouce sharing (passing SOP)
const cors = require('cors');
// mongoDB driver, provide straigh-forward access and a scheme-based solution
const mongoose = require('mongoose');
//routes
const instrumentRoute = require('./routes/instrument')//TODO rest of the routes
const userRoute = require('./routes/user');

// define global variables through "config" directory
require('custom-env').env(process.env.NODE_ENV, './config');

mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use('/instrument',instrumentRoute);//TODO rest of the modules
app.use('/user', userRoute);

console.log(`listening on ${process.env.PORT}`);

app.listen(process.env.PORT);