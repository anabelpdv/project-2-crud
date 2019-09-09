const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const courseSchema = new Schema({
  name : String,
  code: String,
  introduction: String,
  term: {type: String, enum:['Spring','Fall','Summer']},
  startDate: String,
  endDate: String,
  startTime: String,
  endTime: String,
  days:{type:[String],
          enum:['Monday','Tuesday','Wednesday', 'Thursday', 'Friday','Saturday','Sunday']
        },
  syllabusName:String,
  syllabusPath:String,
  previewImage: String,
  instructor: {type: Schema.Types.ObjectId, ref: 'User' },
  studentList: [{type:Schema.Types.ObjectId, ref:'User'}],
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;