
const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const Course    = require('../models/Course');
const bcrypt = require('bcryptjs');
const passport = require("passport");

router.get('/login',(req,res,next) => {
  res.render('users-views/login');
})

router.post('/login', passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.post('/logout', (req, res, next)=>{
  req.logout();
  res.redirect('/login')
})

router.get('/profile', (req, res, next) => {
  let userId = req.user.id;
  let isAdmin = false;

  if(req.user.role == 'ADMIN'){
    isAdmin = true;
  }

  if(req.user.role == 'INSTRUCTOR'){
    Course
    .find({instructor:userId})
    .populate('studentList')
    .populate('instructor')
    .then(courses => {
      res.render('users-views/profile',{courses, isAdmin})
    })
    .catch(err => console.log('Error while retrieving courses',err))
  } else if(req.user.role == 'STUDENT'){
    Course
    .find({studentList: {$all: [userId]}})
    .populate('instructor')
    .then(courses => {
      res.render('users-views/profile',{courses, isAdmin})
    })
    .catch(err => console.log('Error while retrieving courses',err))
  }else{
    Course
    .find()
    .populate('studentList')
    .populate('instructor')
    .then(courses => {
      res.render('courses-views/courses-preview',{courses, isAdmin})
    })
  }
})


module.exports = router;