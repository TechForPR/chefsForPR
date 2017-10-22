const mongoose = require('../config').mongoose;
const forms = require('forms');
const bcrypt  = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const User = new Schema({
  email:{
    type:String,
    required: [true, 'Email of the user is required'],
  },
  password:{
    type:String,
    required: [true, 'Password of the user is required'],
  },
  role:{
    type:String,
    'default': 'standard',
  },
  first_name:{
    type:String,
    'default':'',
  },
  last_name:{
    type:String,
    'default':'',
  },
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
User.methods.isAdmin = function(){
  if(this.role=='admin'|| this.role=='superadmin'){
    return true;
  }
}
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
User.statics.createLoginForm = function() {
  const fields = forms.fields;
  const form = forms.create({
    email: fields.email({
      required: true,
      label: 'Email'
    }),
    password: fields.password({
      label: 'Password'
    }),
  });
  return form;
}
User.statics.createSignUpForm = function() {
  const fields = forms.fields;
  const form = forms.create({
    email: fields.email({
      required: true,
      label: 'Email'
    }),
    password: fields.password({
      label: 'Password'
    }),
    confirm_password: fields.password({
      label: 'Confirm Password'
    }),
  });
  return form;
}
module.exports = mongoose.model('User', User);
