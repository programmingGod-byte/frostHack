const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  githubId: { type: String, unique: true, sparse: true }, // Allow null values
  username: { type: String, required: true },
  email: { type: String, unique: true, sparse: true }, // Allow users without email
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
