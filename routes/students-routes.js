const express = require("express");
const router = express.Router();
const Student = require('../models/Student');

router.get('/students', (req, res, next) => {
  Student
    .find()
    .then(students => res.render('students-views/students', {students}))
    .catch(err => console.log("error rendering component", err))
  
})


module.exports = router;