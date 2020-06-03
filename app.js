const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
require('dotenv').config()

//Passport Config
require('./config/passport')(passport);

//Connect to Mongo
mongoose.connect(process.env.DBSTRING,
 { useNewUrlParser: true,
   useUnifiedTopology: true})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({extended: false}));

//Express Session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash());

//Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Route
app.use('/', require('./routes/index'));

const PORT = 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));