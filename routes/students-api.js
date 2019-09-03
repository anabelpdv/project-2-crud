const express = require('express');
const router = express.Router();
const Student = require('../models/Student');


router.get('/api/students', (req, res, next) => {
  Student
    .find()
    .then(students => {
      res.json(students)
    })
    .catch(err => console.log("Error retriving student", err))
})


module.exports = router;