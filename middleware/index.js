function requiresLogIn(req, res, next) {
  if (req.session && req.session.userID) {
    next();
  } else {
    var err = new Error("You must be logged in to view this page");
    err.status = 401;
    next(err);
  }
}

function logOut(req, res, next) {
  if (req.session && req.session.userID) {
    res.redirect('/profile')
  } 

  next()
}

module.exports = { requiresLogIn,  logOut };
