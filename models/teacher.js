const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

let TeacherSchema = Schema({
  document: String,
  class: String
});

module.exports = () => {
  return mongoose.model('Teacher', TeacherSchema);
};