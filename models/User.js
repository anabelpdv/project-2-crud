const mongoose = require('mongoose')
const Schema =  mongoose.Schema;

const userSchema =  new Schema({
  username: String,
  password: String,
  name: String,
  lastName: String,
  profileImage: String,
  role: {
    type: String,
    enum : ['ADMIN', 'INSTRUCTOR', 'STUDENT'],
    default : 'STUDENT'
  },
});



const User = mongoose.model('User',userSchema);

module.exports = User;