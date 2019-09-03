const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

router.get('/api/courses', (req, res, next) => {
  Course
    .find()
    .then(courses => {
      res.json(courses)
    })
    .catch(err => console.log("Error retriving courses", err))
})


router.post('/api/courses', (req, res, next) => {

  console.log('Coge lo que te mande',req.file)
  // Course
  //   .create(req.body)
  //   .then(response =>{
  //     res.json({msg: 'Course succesfully added'});
  //   })
  //   .catch(err=>{
  //     console.log(err);
  //   })
})


module.exports = router;