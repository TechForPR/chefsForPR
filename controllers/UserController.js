const User = require('../models/User');

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

function login(req, res) {
  const email = req.body.data.email;
  const password = req.body.data.password;
  User.findOne({
    email: email
  }, function(err, user) {
    // if there are any errors, return the error before anything else
    if (err)
      return done(err);

    // if no user is found, return the message
    if (!user){
      return res.status(404).send({
        error: 404,
        message: 'No user found.'
      });
    }

    // if the user is found but the password is wrong
    if (!user.validPassword(password)){
      if (!user){
        return res.status(404).send({
          error: 404,
          message: 'Oops! Wrong password.'
        });
      }
    }
  });
}

module.exports = {
  signup
}
