
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
  Course
      .find({studentList: {$all: [userId]}})
      .populate('studentList')
      .populate('instructor')
      .then(courses => {
        res.render('users-views/profile', {userId})
      })
      .catch(err => console.log('Error while retrieving courses',err))
})


module.exports = router;