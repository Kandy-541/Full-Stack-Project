const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, trim: true },
    avatarUrl: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
