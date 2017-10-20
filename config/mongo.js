const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://127.0.0.1:27017/chefsForPRTest');

module.exports = mongoose;
