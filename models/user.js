const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  accessLvl: Number,
  name: String,
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },
  teacher_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher"
  }
});

UserSchema.pre('save', function (next) {
  if (this.teacher_id) {
    this.accessLvl = 1;
  }

  if (this.student_id) {
    this.accessLvl = 2;
  }

  next();
});

UserSchema.methods.validPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  })
};


module.exports = () => {
  return mongoose.model('User', UserSchema);
};