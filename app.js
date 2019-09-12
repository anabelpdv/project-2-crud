require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');


const session      = require("express-session");
const passport     = require("passport");
const LocalStrategy= require("passport-local").Strategy;

const User         = require('./models/User');
const bcrypt       = require('bcryptjs');
const flash        = require("connect-flash");


mongoose
  //.connect(`mongodb://localhost/${process.env.mongoDb}`, {useNewUrlParser: true})
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.locals.title = 'Spark';

app.use(session({
  secret: "randomsecretword",
  resave: true,
  saveUninitialized: true
}));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(flash());

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));


app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  let isAdmin = false;
  res.locals.currentUser = req.user;
  if(req.user){
    if(req.user.role == 'ADMIN'){
      isAdmin = true;
    }
  }

  res.locals.isAdmin = isAdmin; 
  res.locals.errorMessage = req.flash('error');
  res.locals.successMessage = req.flash('success');
  next();
});


app.use('/', require('./routes/index'));
app.use('/',require('./routes/students-routes'))
app.use('/',require('./routes/instructors-routes'))
app.use('/',require('./routes/courses-routes'))
app.use('/',require('./routes/assignments-routes'))
app.use('/',require('./routes/uploads-routes'))
app.use('/',require('./routes/users-routes'))
app.use('/',require('./routes/courses-api'))


module.exports = app;
