const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const courseSchema = new Schema({
  name : String,
  code: String,
  previewImage: String,
  instructor:{type:Schema.Types.ObjectId, ref:'Instructor'},
  studentList: [{type:Schema.Types.ObjectId, ref:'Student'}]
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;