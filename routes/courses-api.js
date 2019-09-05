const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

router.get('/api/courses', (req, res, next) => {
  Course
    .find()
    .then(courses => {
      res.json(courses)
    })
    .catch(err => next(err))
})

router.get('/api/courses/:id', (req, res, next) => {
  Course
    .findById(req.params.id)
    .then(course => {
      res.json(course)
    })
    .catch(err => next(err))
})

module.exports = router;