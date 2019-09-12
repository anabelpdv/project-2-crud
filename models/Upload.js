const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const uploadSchema = new Schema({
  assignment:{type:Schema.Types.ObjectId, ref:'Assignment'},
  course : {type:Schema.Types.ObjectId, ref:'Course'},
  author : {type:Schema.Types.ObjectId, ref:'User'},
  documentPath: String,
});

const Upload = mongoose.model('Upload', uploadSchema);
module.exports = Upload;