const middleware = {
  loggedInOnly:function(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
  },
  nonLoggedInOnly:function(req,res,next){
    // if user is authenticated in the session, carry on
    if (!req.isAuthenticated())
      return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
  },
  adminsOnly:function(req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin())
      return next();
    //If not admin take to dashboard
    res.redirect('/');
  },
  nonAdminsOnly:function(req, res, next) {
    if (req.isAuthenticated() && !req.user.isAdmin())
      return next();
    //If not admin take to dashboard
    res.redirect('/');
  }
}
module.exports = middleware;
