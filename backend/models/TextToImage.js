const mongoose = require('mongoose');

const TextToImageScheme = new mongoose.Schema({
  githubId: { type: String}, // Allow null values
  username: { type: String, required: true },
  email: { type: String }, // Allow users without email
  avatar: { type: String },
  image:{type:String}
});

module.exports = mongoose.model('TexttoImage', TextToImageScheme);
