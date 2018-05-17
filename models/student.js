const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

let StudentSchema = Schema({
    age: Number,
    class: String,
    responsable: String
});
  

module.exports = () => {
    return mongoose.model('Student', StudentSchema);
};