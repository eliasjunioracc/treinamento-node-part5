const mongoose = require('mongoose');
const bluebird = require('bluebird');
const env = process.env.NODE_ENV || 'development';
const config = require('../config');
mongoose.Promise = bluebird;
mongoose.connect(config[env].url)
module.exports = mongoose; 