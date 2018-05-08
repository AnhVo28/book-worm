var express = require("express");
var router = express.Router();
var User = require("../models/user.js");

// GET /login
router.get("/login", (req, res, next) => {
  res.render("login", { title: "Login site" });
});

// POST / login
router.post("/login", (req, res, next) => {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, (err, user) => {
      

      if (err || !user) {
        var err = new Error("Wrong email or password");
        err.status = 401;
        return next(err);
      } else {
        req.session.userID = User._id;
        res.redirect("/profile");
      }
    });
  } else {
    var err = new Error("Email and password are required!");
    err.status = 401; // 401 is unauthozied sections
    return next(err);
  }
});

// GET / register

router.get("/register", (req, res, next) => {
  return res.render("register", { title: "Sign up" });
});

// POST / register

router.post("/register", (req, res, next) => {
  if (
    req.body.email &&
    req.body.favoriteBook &&
    req.body.password &&
    req.body.confirmPassword
  ) {
    if (req.body.password !== req.body.confirmPassword) {
      var err = new Error("Passwords do not match");
      return next(err);
    }
    // Create a obj with user ipnut
    var userData = {
      email: req.body.email,
      name: req.body.favoriteBook,
      favoriteBook: req.body.password,
      password: req.body.password
    };

    // Use schema's create method to insert documentation into Mogoose
    User.create(userData, (error, user) => {
      if (error) {
        return next(error);
      } else {
        return res.redirect("/profile");
      }
    });
  } else {
    var err = new Error("All fields required!");
    return next(err);
  }
});

// GET /
router.get("/", function(req, res, next) {
  return res.render("index", { title: "Home" });
});

// GET /about
router.get("/about", function(req, res, next) {
  return res.render("about", { title: "About" });
});

// GET /contact
router.get("/contact", function(req, res, next) {
  return res.render("contact", { title: "Contact" });
});

module.exports = router;
