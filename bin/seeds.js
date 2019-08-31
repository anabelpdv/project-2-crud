const mongoose = require('mongoose')
const Instructor = require('../models/Instructor');
mongoose
  .connect('mongodb://localhost/project-2', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const instructorsArray = [
  { 
    name : 'John',
    lastName: 'Doe',
    profileImage: '/images/profile.jpg'
  },
  { 
    name : 'Robert',
    lastName: 'Jhones',
    profileImage: '/images/profile1.jpg'
  },
  { 
    name : 'Chris',
    lastName: 'Trump',
    profileImage: '/images/profile.jpg'
  }
]
Instructor 
        .create(instructorsArray)
        .then(data => console.log(data))
        .catch(err => console.log('Something whent wrong while creating celebrity'));