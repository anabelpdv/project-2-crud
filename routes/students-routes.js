const express = require("express");
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/students/create', (req, res, next) => {
  res.render('students-views/student-create')
})

router.post('/students/create', (req, res, next) => {
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

  const newStudent = {
    name : req.body.name,
    lastName : req.body.lastName,
    username : username,
    password : hashedPassword,
    role : 'STUDENT'
  }
  User
      .create(newStudent)
      .then(newStudent => {
        res.redirect('/')
      })

})



// router.post('/students/create', (req, res, next) => {
//   Student
//         .create(req.body)
//         .then(newStudent => {
//             res.redirect('/students')//Here need to redirect to students detail when view is available
//         })
//         .catch(err => next(err))
// })

// router.get('/students', (req, res, next) => {
//   Student
//       .find()
//       .then(students => {
//         res.render('students-views/students', {students})
//       })
//       .catch(err => console.log("Error retriving student", err)) 
// })

// router.get('/student/profile/:id', (req, res, next) => {
//   let studentId = req.params.id;
//   Course
//       .find({studentList: {$all: [studentId]}})
//       .populate('studentList')
//       .populate('instructor')
//       .then(courses => {
//         res.render('students-views/student-profile', {courses,studentId})
//       })
//       .catch(err => console.log('Error while retrieving courses',err))
// })

module.exports = router;