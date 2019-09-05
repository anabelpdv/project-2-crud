const express = require("express");
const router = express.Router();
const Course = require('../models/Course');
const Student = require('../models/Student');
const Instructor = require('../models/Instructor');
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

const schoolTerms = ['Spring','Fall','Summer'];
const weekDays = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY']; 
router.get('/courses/create',(req, res, next) => {
  if(req.user.role != 'ADMIN'){
    req.flash('error', 'Need admin permition to create course')
    res.redirect('/')
  }
  Instructor
        .find()
        .then(instructors => {
            Student
                    .find() 
                    .then(students => {
                      res.render('courses-views/course-create', {students, instructors,weekDays,schoolTerms}) 
                    })
                    .catch(err => next(err))
          
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

  router.get('/course/edit/:id',(req, res, next) => {
    Course
          .findById(req.params.id)
          .then(course  => {
              Instructor
                    .find()
                    .then(instructors => {
                        Student
                              .find() 
                              .then(students => {
                                instructors.forEach(instructor => {
                                  if(instructor._id.equals(course.instructor)){
                                    instructor.isTeaching = true;
                                  }
                                })
                                students.forEach(student => {
                                  course.studentList.forEach(courseStudent =>{
                                    if(student._id.equals(courseStudent)){
                                      student.isInCourse = true;
                                    }
                                  })
                                
                                })
                                res.render('courses-views/course-edit', {course, students, instructors,schoolTerms}) 
                              })
                              .catch(err => next(err)) 
                      })
                    .catch(err => next(err))
          })
          .catch(err => next(err))    
  })

  router.post('/course/edit',uploadCloud.single('syllabus'),(req, res, next) => {
    const updatedCourse = {
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
          .findByIdAndUpdate(req.body.id,updatedCourse )
          .then(updatedcourse => {
            req.flash('success', 'Course succesfully updated')
            res.redirect(`/course/details/${req.body.id}`)
          })
          .catch(err => next(err))     
  })
  
module.exports = router;


