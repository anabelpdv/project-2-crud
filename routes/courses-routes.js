const express = require("express");
const router = express.Router();
const Course = require('../models/Course');

router.get('/courses', (req, res, next) => {
  Course
    .find()
    .populate('instructor')
    .populate('studentList')
    .then(courses => res.render('courses-views/courses.hbs', {courses}))
    .catch(err => console.log("Error retrieving course", err))
  
})

module.exports = router;