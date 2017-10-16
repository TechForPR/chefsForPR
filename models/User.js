const mongoose = require('../config').mongoose;
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const forms = require('forms');
const bcrypt   = require('bcrypt-nodejs');

// app.use(session({ secret: 'somethingsecret' }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
const conditionalRequire = {
  validator: function() {
    return (this.email && this.email !== null) || (this.phone && this.phone !== null);
  },
  msg: 'Email or Phone Number are required',
};
const Schema = mongoose.Schema;
const User = new Schema({
  email:String,
  password:String
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  },
  timestamps: true,
});
User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
User.statics.createLoginForm = function() {
  const fields = forms.fields;
  const form = forms.create({
    email: fields.string({
      required: true,
      label: 'email'
    }),
    password: fields.string({
      label: 'password'
    }),
  });
  return form;
}
User.statics.createSignUpForm = function() {
  const fields = forms.fields;
  const form = forms.create({
    email: fields.string({
      required: true,
      label: 'Email'
    }),
    password: fields.string({
      label: 'Password'
    }),
  });
  return form;
}
module.exports = mongoose.model('User', User);
