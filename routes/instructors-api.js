const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor');

router.get('/api/instructors', (req, res, next) => {
  Instructor
    .find()
    .then(instructors => {
      res.json(instructors)
    })
    .catch(err => console.log("Error retriving instructor", err))
})


module.exports = router;