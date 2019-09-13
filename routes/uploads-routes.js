const express = require("express");
const router = express.Router();
const Upload = require('../models/Upload');
const uploadCloud = require('../config/cloudinary.js');



router.post('/uploads/create', uploadCloud.single('documentPath'),(req, res, next) => {
  let upload = {
    assignment: req.body.assignment,
    course : req.body.course,
    author : req.body.author,
    documentPath : req.file.secure_url,
  }

  Upload
        .create(upload)  
        .then(upload =>{
          res.redirect(`/course/details/${req.body.course}/page/4`)
        })
        .catch(err => next(err))
})






module.exports = router;