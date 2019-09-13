const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const assigmentSchema = new Schema({
  title : String,
  description: String,
  course: {type: Schema.Types.ObjectId, ref: 'Course' },
});

const Assignment = mongoose.model('Assignment', assigmentSchema);
module.exports = Assignment;

