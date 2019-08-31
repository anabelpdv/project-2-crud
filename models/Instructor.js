const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const instructorSchema = new Schema({
  name : String,
  lastName: String,
  profileImage: String
});

const Instructor = mongoose.model('Instructor', instructorSchema);
module.exports = Instructor;