const express = require("express");
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');
const uploadCloud = require('../config/cloudinary.js');

router.get('/courses', (req, res, next) => {
  let isAdmin = false;
  if(req.user.role == 'ADMIN'){
    isAdmin = true;
  }
  Course
    .find()
    .populate('instructor')
    .populate('studentList')
    .then(courses => res.render('courses-views/courses-preview', {courses, isAdmin:isAdmin}))
    .catch(err => console.log("Error retrieving course", err))
  
})

router.get('/course/details/:id', (req, res, next) => {
  Course
    .findById(req.params.id)
    .then(course => {
      res.render('courses-views/course-details', {course})
    })
    .catch(err => console.log("Error retrieving course information", err))
})

router.get('/course/details/:id/page/:code', (req, res, next) => {
  Course
    .findById(req.params.id)
    .then(course => {
        switch(req.params.code){
          case '0':
              res.render('courses-views/schedule', {course})
              break;
          case '1':
              res.render('courses-views/intro', {course})
              break;    
          case '2':
              res.render('courses-views/syllabus', {course})
              break;  
        }
    })
    .catch(err => console.log("Error retrieving course information", err))
})

const schoolTerms = ['Spring','Fall','Summer'];
const weekDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']; 

router.get('/courses/create',(req, res, next) => {
  if(req.user.role != 'ADMIN'){
    req.flash('error', 'Need admin permition to create course')
    res.redirect('/')
  }
  User
      .find({role : 'INSTRUCTOR'})
      .then(instructors => {
        User
            .find({role : 'STUDENT'}) 
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

  router.get('/courses/edit/:id',(req, res, next) => {
    Course
          .findById(req.params.id)
          .then(course  => {
              User
                    .find({role:'INSTRUCTOR'})
                    .then(instructors => {
                        User
                              .find({role: 'STUDENT'}) 
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


  router.post('/courses/delete/:id',(req, res, next) => {
    Course
          .findByIdAndRemove(req.params.id)  
          .then(()=>{
            res.redirect('/courses')
          })
          .catch(err => next(err))
  })
module.exports = router;


