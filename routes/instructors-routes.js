const express = require("express");
const router = express.Router();
const User = require('../models/User');
const uploadCloud = require('../config/cloudinary.js');
const Course = require('../models/Course');
const Utils = require('../public/javascripts/utils');

const bcrypt = require('bcryptjs');


router.get('/instructors/create',Utils.checkRoles('ADMIN'), (req, res, next) => {
  if(!req.user){
    res.redirect('/login')
  }
  res.render('instructors-views/instructor-create')
})

router.post('/instructors/create', uploadCloud.single('photo'), (req, res, next) => {
  let username = req.body.username;
  let pword = req.body.password;

  if(!username || !pword){
    req.flash('error', 'Please provide both username and password it seems you have forgotton one or both')
    res.redirect('/instructors/create')
  }
  User
      .findOne({ username })
      .then(user => {
          if (user !== null) {
          req.flash('error', 'The username already exists')
          res.redirect('/instructors/create')
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
        res.redirect('/instructors')
      })

})

router.get('/instructors',Utils.checkRoles('ADMIN'), (req, res, next) => {
  User
    .find({role: 'INSTRUCTOR'},null,{sort:{name:1}})
    .then(instructors => res.render('instructors-views/instructors', {instructors}))
    .catch(err => console.log("Error retrieving course", err))
  
})

router.get('/instructor/edit/:id',Utils.checkRoles('ADMIN'), (req, res, next) => {
  User
      .findById(req.params.id)
      .then(instructor => {
        res.render('instructors-views/instructor-edit',{instructor})
      })
      .catch(err=>next(err))
})

router.post('/instructor/edit/:id', (req, res, next) => {
  User
      .findByIdAndUpdate(req.params.id,req.body)
      .then(() => {
        res.redirect('/instructors')
      })
      .catch(err=>next(err))
})

router.post('/instructors/delete/:id', (req, res, next) => {
  User
      .findByIdAndRemove(req.params.id)
      .then(instructor => {
        res.redirect('/instructors')
      })
      .catch(err => next(err)) 
})

module.exports = router;