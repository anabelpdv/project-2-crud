const express = require("express");
const router = express.Router();
const User = require('../models/User');
const uploadCloud = require('../config/cloudinary.js');
const Course = require('../models/Course');
const bcrypt = require('bcryptjs');


router.get('/instructors/create', (req, res, next) => {
  res.render('instructors-views/instructors-create')
})

router.post('/instructors/create', uploadCloud.single('photo'), (req, res, next) => {
  let username = req.body.username;
  let pword = req.body.password;

  if(!username || !pword){
    res.redirect('/')
    req.flash('error', 'please provide both username and password it seems you have forgotton one or both')
  }

  User
      .findOne({ username })
      .then(user => {
          if (user !== null) {
          req.flash('error', 'The username already exists')
          res.redirect('/signup')
    }
  })

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(pword, salt);

  let photo = '/images/default-image.png';
  if(req.file){
    photo =  req.file.url;
  }

  const newInstructor = {
    name : req.body.name,
    lastName : req.body.lastName,
    username : username,
    password : hashedPassword,
    photo: photo,
    role : 'INSTRUCTOR'
  }
  User
      .create(newInstructor)
      .then(newUser => {
        res.redirect('/')
      })

})

router.get('/instructors', (req, res, next) => {
  User
    .find({role: 'INSTRUCTOR'},null,{sort:{name:1}})
    .then(instructors => res.render('instructors-views/instructors', {instructors}))
    .catch(err => console.log("Error retrieving course", err))
  
})


module.exports = router;