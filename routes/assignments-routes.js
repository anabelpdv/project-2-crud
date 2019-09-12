const express = require("express");
const router = express.Router();
const Assignment = require('../models/Assignment');
const Upload = require('../models/Upload');

router.get('/assignment/details/:id/course/:courseId',(req, res, next) => {
  let courseId = req.params.courseId;
  let currentAssignment = req.params.id;
  Assignment
        .findById(currentAssignment)  
        .then(theAssignment => {
          Upload
                .find({assignment: `${currentAssignment}`})
                .populate('author')
                .then(uploads => {
                  res.render('assignments-views/assignment-details',{theAssignment,courseId,uploads})
                })
                .catch(err => next(err))
        })
        .catch(err => next(err))
})


router.post('/assignments/create',(req, res, next) => {
  Assignment
        .create(req.body)  
        .then((assigment)=>{
          res.redirect(`/course/details/${assigment.course}/page/4`)
        })
        .catch(err => next(err))
})






module.exports = router;