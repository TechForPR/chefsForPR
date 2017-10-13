const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chefsForPR');

module.exports = mongoose;
