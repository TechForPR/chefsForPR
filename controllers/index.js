const routes = require('express').Router();
const passport = require('passport');
const RequestControlller = require('./RequestController');
const UserControlller = require('./UserController');

routes.get('/', function(req, res) {
  res.status(200).send({
    message: 'Welcome to the API!'
  });
});

// Food Requests
routes.post('/user/signup', UserControlller.signup);
routes.post('/user/login', function(req, res, next) {
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
});
routes.all('*', function(req, res) {
  res.status(404).send({
    error: 404,
    message: 'invalid endpoint'
  });
});

module.exports = routes;
