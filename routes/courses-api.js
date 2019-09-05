const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

router.get('/api/courses', (req, res, next) => {
  Course
    .find()
    .then(courses => {
      res.json(courses)
    })
    .catch(err => console.log("Error retrieving courses", err))
})

router.get('/api/courses/:id', (req, res, next) => {
  Course
    .findById(req.params.id)
    .then(course => {
      res.json(course)
    })
    .catch(err => console.log("Error retriving courses", err))
})

module.exports = router;