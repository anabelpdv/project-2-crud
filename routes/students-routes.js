const express = require("express");
const router = express.Router();
const Student = require('../models/Student');
const Course = require('../models/Course');

router.get('/students', (req, res, next) => {
  Student
    .find()
    .then(students => res.render('students-views/students', {students}))
    .catch(err => console.log("Error retriving student", err))
  
})

router.get('/student/profile/:id', (req, res, next) => {

  let studentId = req.params.id;
  Course
  .find({studentList: { $all: [studentId]}})
  .populate('studentList')
  .populate('instructor')
  .then(courses => res.render('students-views/student-profile', {courses,studentId}))
  .catch(err => console.log('Error while retrieving courses',err))
})



module.exports = router;