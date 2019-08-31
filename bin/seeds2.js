const mongoose = require('mongoose')
const Course = require('../models/Course');
mongoose
  .connect('mongodb://localhost/project-2', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


const coursesArray = [
  { 
    name : 'History',
    code: 'ASH 2030',
    previewImage: '/images/history.jpg',
    instructor:"5d69ddf2bc8cbf47bdb7a762",
    studentList: ['5d69da609752fc477d711fd4','5d69da609752fc477d711fd3','5d69da609752fc477d711fd2'] 
  },
  { 
    name : 'Math',
    code: 'MAT 3033',
    previewImage: '/images/math.jpg',
    instructor:"5d69ddf2bc8cbf47bdb7a764",
    studentList: ['5d69da609752fc477d711fd2','5d69da609752fc477d711fd3']
  },
  { 
    name : 'Math',
    code: 'CGS 3095',
    previewImage: '/images/global.jpg',
    instructor:"5d69ddf2bc8cbf47bdb7a763",
    studentList: ['5d69da609752fc477d711fd4','5d69da609752fc477d711fd3'] 
  }
]
Course 
        .create(coursesArray)
        .then(data => console.log(data))
        .catch(err => console.log('Something whent wrong while creating celebrity'));