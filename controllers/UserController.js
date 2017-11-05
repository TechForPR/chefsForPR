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
function getByQueryParams(req, res){
    var query = {};
    var sortBy = {};
    var limit = 200;
    let param = '';

    // add request query params
    for(param in req.query){
        if(['limit', 'sortBy', 'createdAt'].indexOf(param) < 0){
            query[param] = req.query[param];
        }
    }
    // limit to 25 by docs by default, "limit" query param overwrites this value
    var re = /^[0-9]*$/i;
    if(req.query.hasOwnProperty('limit') && req.query.limit.match(re)){
        limit = parseInt(req.query.limit);
    }
    // sortBy by one field
    var re2 = /^[-|+]+[a-zA-Z0-9]*$/i;
    if(req.query.hasOwnProperty('sortBy') && req.query.limit.match(re2)){
        sortBy = req.query[param];
    }
    if (req.query.hasOwnProperty('createdAt')) {
        query.createdAt =  {
            '$gte': moment(req.query.createdAt).startOf('day'),
            '$lt': moment(req.query.createdAt).endOf('day'),
        };
    }
    // query the schema
    User.find(query).limit(limit).sort(sortBy).then((docs) => {
        if(docs.length > 0){
            res.status(200).send(docs);
        }else{
            res.status(404).send({ error: 404, message: 'No users matching criteria'});
        }
    }).catch((err) => {
        res.status(500).send(Object.assign({ error: 500, message: 'Server error'}, err));
    });
}
module.exports = {
  signup,
  login,
  getByQueryParams,
}
