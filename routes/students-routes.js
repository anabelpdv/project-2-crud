const express = require("express");
const router = express.Router();
const User = require('../models/User');
const uploadCloud = require('../config/cloudinary.js');
const bcrypt = require('bcryptjs');

router.get('/students/create', (req, res, next) => {
  res.render('students-views/student-create')
})

router.post('/students/create', uploadCloud.single('photo'), (req, res, next) => {
  let username = req.body.username;
  let pword = req.body.password;

  if(!username || !pword){
    res.redirect('/')
    req.flash('error', 'please provide both username and password it seems you have forgotton one or both')
  }

  User
      .findOne({ username })
      .then(user => {
          if (user !== null) {
          req.flash('error', 'The username already exists')
          res.redirect('/signup')
    }
  })

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(pword, salt);

  let photo = '/images/default-image.png';
    if(req.file){
      photo =  req.file.url;
    }

  const newStudent = {
    name : req.body.name,
    lastName : req.body.lastName,
    username : username,
    password : hashedPassword,
    photo: photo,
    role : 'STUDENT'
  }
  User
      .create(newStudent)
      .then(newStudent => {
        res.redirect('/')
      })

})


router.get('/students', (req, res, next) => {
  User
      .find({role: 'STUDENT'},null,{sort:{name:1}})
      .then(students => {
        res.render('students-views/students', {students})
      })
      .catch(err => console.log("Error retriving student", err)) 
})

module.exports = router;