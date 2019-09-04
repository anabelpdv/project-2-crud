const express = require("express");
const router = express.Router();
const Course = require('../models/Course');
const Student = require('../models/Student');
const uploadCloud = require('../config/cloudinary.js');

router.get('/courses', (req, res, next) => {
  Course
    .find()
    .populate('instructor')
    .populate('studentList')
    .then(courses => res.render('courses-views/courses-preview', {courses}))
    .catch(err => console.log("Error retrieving course", err))
  
})

router.get('/course/details/:id', (req, res, next) => {

  Course
    .findById(req.params.id)
    .populate('instructor')
    .then(course => res.render('courses-views/course-details', {course}))
    .catch(err => console.log("Error retrieving course information", err))
  
})

router.get('/courses/create',(req, res, next) => {
  Student
        .find()
        .then(students => {
          res.render('courses-views/course-create', {students}) 
        })
        .catch(err => next(err))

})

router.post('/courses/create',uploadCloud.single('syllabus'),(req, res, next) => {
  const newCourse = {
    name: req.body.name,
    code: req.body.code,
    introduction: req.body.introduction,
    term: req.body.term,
    startDate: req.body.startDate,
    endDate:  req.body.endDate,
    startTime: req.body.startTime,
    endTime:  req.body.endTime,
    days: req.body.days,
    syllabusName : req.file.originalname,
    syllabusPath: req.file.url,
    previewImage: '/images/preview-0.jpg',
    instructor: req.body.instructor,
    studentList: req.body.studentList,
  }

  Course
        .create(newCourse)  
        .then(course => {
          console.log('Succes! new course created: ',course)
          res.redirect('/')
        })
        .catch(err => next(err));
  })
module.exports = router;


