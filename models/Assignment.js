const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const assigmentSchema = new Schema({
  title : String,
  description: String,
  course: {type: Schema.Types.ObjectId, ref: 'Course' },
});

const Assignment = mongoose.model('Assignment', assigmentSchema);
module.exports = Assignment;


//when inside course grab course id then create an upload with user id and url and push it to submissions. 
//Submmisions are linked to course by the course id. Instructors create assignments and students create
// uploads and push them into assignment submissions.


