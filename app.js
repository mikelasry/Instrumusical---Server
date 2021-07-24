// web app framework for node.js
const express = require('express');

// pars incoming request bodies in a middleware before the handlers
const bodyParser = require('body-parser');

var passport = require('passport');

// cross-origin resouce sharing (passing SOP)
const cors = require('cors');

// mongoDB driver, provide straigh-forward access and a scheme-based solution
const mongoose = require('mongoose');

const sketch = require('./models/cms');

require('./models/user');
require('./config/passport');
// define global variables through "config" directory
require('custom-env').env(process.env.NODE_ENV, './config');

//routes
const instrumentRoute = require('./routes/instrument'); 
const userRoute = require('./routes/user');
const searchRoute = require('./routes/search');
const authRouter = require('./routes/index'); /// ????
const statsRoute = require('./routes/stats');
const Instrument = require('./models/instrument');
const orderRoute = require('./routes/order');



mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});

var app = express();
app.use(passport.initialize());
// Catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
    }
  });
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use('/instruments',instrumentRoute);
app.use('/user', userRoute);
app.use('/search',searchRoute);
app.use('/stats',statsRoute);
app.use('/order',orderRoute);


// loadig CMS data (overcome server reloading)
//CMS implementation
Instrument.collection.find().then(insts => {
    insts.forEach(
        (doc)=>{
            let reviews = doc.reviews;
            if(reviews.length > 0){
                for(let review of reviews){
                    let tokens = review.split(" ");
                    for(let token of tokens){
                        sketch.sketch.update(token, 1);
                    }
                }
            }
        }
    );
});

app.listen(process.env.PORT);
console.log(`listening on ${process.env.PORT}`);



