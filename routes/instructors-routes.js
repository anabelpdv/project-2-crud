const express = require("express");
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');
const bcrypt = require('bcryptjs');


router.get('/instructors/create', (req, res, next) => {
  res.render('instructors-views/instructors-create')
})


router.post('/instructors/create', (req, res, next) => {
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

  const newInstructor = {
    name : req.body.name,
    lastName : req.body.lastName,
    username : username,
    password : hashedPassword,
    role : 'INSTRUCTOR'
  }
  User
      .create(newInstructor)
      .then(newUser => {
        res.redirect('/')
      })

})

// router.post('/instructors/create', (req, res, next) => {

//   // Instructor
//   //           .create(req.body)
//   //           .then(res.redirect('/instructors'))
//   //           .catch(err => next(err))
    
//   // })
//   User.create({
//     name: req.body.name,
//     etc,
//     role: 'INSTRUCTOR'
//   })

// router.get('/instructors', (req, res, next) => {
//   Instructor
//     .find()
//     .then(instructors => res.render('instructors-views/instructors', {instructors}))
//     .catch(err => console.log("Error retrieving course", err))
  
// })


// router.get('/instructor/profile/:id', (req, res, next) => {
//   let instructorId = req.params.id;
//   Course
//   .find({instructor: instructorId})
//   .populate('studentList')
//   .then(courses => res.render('instructors-views/instructor-profile', {courses,instructorId}))
//   .catch(err => console.log('Error while retrieving courses',err))
// })

module.exports = router;