const User = require('../models/User');
const passport = require('passport');
function signup(req, res) {
  if (!req.body || !req.body.data) {
    return res.status(422).send({
      error: 422,
      message: 'Missing data'
    });
  }
  const user = new User(req.body.data);
  const email = req.body.data.email;
  const password = req.body.data.password;
  const confirm_password  = req.body.data.confirm_password;
  if(!email){
    return res.status(400).send({
      error: 400,
      message: 'Valid email required'
    });
  }
  if(!password){
    return res.status(400).send({
      error: 400,
      message: 'Password required'
    });
  }
  if(password!=confirm_password){
    return res.status(400).send({
      error: 400,
      message: 'Passwords do not match'
    });
  }
  User.findOne({
    email: email
  }, function(err, user) {
    if (err)
      return done(err);
    if (user) {
      return res.status(400).send({
        error: 400,
        message: 'That email is already taken.'
      });
    } else {
      var newUser = new User();
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      newUser.save(function(err) {
        if (err) {
          throw err;
        }
        return res.status(200).send({
          error: 200,
          message: 'Account Created Successfully'
        });
      });
    }
  });
  // user.save().then(doc => {
  //     res.status(200).send({ doc });
  // }).catch(err => {
  //     res.status(400).send(Object.assign({error: 400}, err));
  // });
}

function login(req, res, next) {
  /* look at the 2nd parameter to the below call */
  passport.authenticate('local-login', function(err, user, info) {
    console.log(err);
    console.log(user);
    console.log(info);
    if (err) { return next(err); }
    if (!user) { return res.status(401).send({
      error: 401,
      message: 'Username/password do not match'
    }); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.status(200).send({
        error: 200,
        message: 'Login successful'
      });
    });
  })(req, res, next);
}

module.exports = {
  signup,
  login
}
