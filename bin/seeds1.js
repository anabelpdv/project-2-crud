const mongoose = require('mongoose')
const Student = require('../models/Student');
mongoose
  .connect('mongodb://localhost/project-2', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const studentsArray = [
  { 
    name : 'Anabel',
    lastName: 'Perez',
    profileImage: '/images/profile.jpg'
  },
  { 
    name : 'Adrian',
    lastName: 'Rodrigues',
    profileImage: '/images/profile1.jpg'
  },
  { 
    name : 'Mercedes',
    lastName: 'De Pablos-Velez',
    profileImage: '/images/profile.jpg'
  }
]
Student 
        .create(studentsArray)
        .then(data => console.log(data))
        .catch(err => console.log('Something whent wrong while creating celebrity'));