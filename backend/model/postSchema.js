const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    postImage: {
      type: String,
      required: true
    },
    image_path:{
      type:String
    }
});

module.exports = mongoose.model('Post', postSchema);