const express = require("express");
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');
const Utils = require('../public/javascripts/utils');
const Assignment = require('../models/Assignment');
const uploadCloud = require('../config/cloudinary.js');

// router.get('/courses', Utils.ensureAuthenticated,(req, res, next) => {
//   Course
//     .find()
//     .populate('instructor')
//     .populate('studentList')
//     .then(courses => res.render('courses-views/courses-preview', {courses}))
//     .catch(err => console.log("Error retrieving course", err))
  
// })

router.get('/course/details/:id',Utils.ensureAuthenticated, (req, res, next) => {
  Course
    .findById(req.params.id)
    .then(course => {
      res.render('courses-views/course-details', {course})
    })
    .catch(err => console.log("Error retrieving course information", err))
})

router.get('/course/details/:id/page/:code',Utils.ensureAuthenticated, (req, res, next) => {
  let courseId = req.params.id;
  Course
    .findById(courseId)
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
          case '3':
              res.render('courses-views/modules', {course})
              break; 
          case '4':
              Assignment
                        .find({course:courseId})
                        .then(assignments => {
                          res.render('courses-views/assignments', {course, assignments})
                        })
                        .catch(err => next(err))
              break; 
          case '5':
              res.render('courses-views/articles', {course})
              break;
          case '6':
              res.render('courses-views/videos', {course})
              break;  
        }
    })
    .catch(err => next (err))
})

const schoolTerms = ['Spring','Fall','Summer'];
const weekDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']; 

router.get('/courses/create',Utils.checkRoles('ADMIN'),(req, res, next) => {
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
  let syllabusPath = '/images/default-syllabus.pdf';
    if(req.file){
      syllabusPath = req.file.url;
    }

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
    syllabusPath: syllabusPath,
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

  router.get('/courses/edit/:id',Utils.checkRoles('ADMIN'),(req, res, next) => {
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

    let syllabusPath = '/images/default-syllabus.pdf';
    if(req.file){
      syllabusPath = req.file.url;
    }

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
      syllabusPath: syllabusPath,
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


