const mongoose = require('mongoose');
const validator = require('validator');
const argon2 = require('argon2');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required.'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verified: Date,
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  },
});

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await argon2.hash(this.password);
});

UserSchema.methods.comparePassword = async function (tryPassword) {
  const isMatch = await argon2.verify(this.password, tryPassword);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
