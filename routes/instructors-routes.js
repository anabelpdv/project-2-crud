const express = require("express");
const router = express.Router();
const Instructor = require('../models/Instructor');
const Course = require('../models/Course');

router.get('/instructors', (req, res, next) => {
  Instructor
    .find()
    .then(instructors => res.render('instructors-views/instructors.hbs', {instructors}))
    .catch(err => console.log("Error retrieving course", err))
  
})


router.get('/instructor/profile/:id', (req, res, next) => {
  let instructorId = req.params.id;
  Course
  .find({instructor: instructorId})
  .populate('studentList')
  .then(courses => res.render('instructors-views/instructor-profile', {courses,instructorId}))
  .catch(err => console.log('Error while retrieving courses',err))
})

module.exports = router;