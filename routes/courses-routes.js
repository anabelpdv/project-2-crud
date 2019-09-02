const express = require("express");
const router = express.Router();
const Course = require('../models/Course');
const uploadCloud = require('../config/cloudinary.js');

router.get('/courses', (req, res, next) => {
  Course
    .find()
    .populate('instructor')
    .populate('studentList')
    .then(courses => res.render('courses-views/courses.hbs', {courses}))
    .catch(err => console.log("Error retrieving course", err))
  
})

router.get('/courses/create', (req, res, next) => {
    res.render('courses-views/course-create') 
})

router.post('/courses/create',uploadCloud.single('syllabus'),(req, res, next) => {
const newCourse = {
  name: req.body.name,
  code: req.body.code,
  introduction: req.body.introduction,
  startDate: req.body.startDate,
  endDate:  req.body.endDate,
  syllabusName : req.file.originalname,
  syllabusPath: req.file.url,
}

Course
      .create(newCourse)  
      .then(course => console.log('Succes! new course created: ',course))
      .catch(err => next(err));
})
module.exports = router;


/*



  name : String,
  code: String,
  introduction: String,
  startDate: Date,
  endDate: Date,
  syllabusName:String,
  syllabusPath:String,
  previewImage: String,
  instructor: {type: Schema.Types.ObjectId, ref: 'Instructor' },
  studentList: [{type:Schema.Types.ObjectId, ref:'Student'}]



router.post('/movie/add', uploadCloud.single('photo'), (req, res, next) => {
  const { title, description } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newMovie = new Movie({title, description, imgPath, imgName})
  newMovie.save()
  .then(movie => {
    res.redirect('/');
  })
  .catch(error => {
    console.log(error);
  })
}); */