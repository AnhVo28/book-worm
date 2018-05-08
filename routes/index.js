var express = require("express");
var router = express.Router();
var User = require('../models/user.js')

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
    email:  req.body.email, 
    name: req.body.favoriteBook, 
    favoriteBook: req.body.password, 
    password: req.body.password
    };


    // Use schema's create method to insert documentation into Mogoose
    User.create(userData, (error, user)=>{
      if (error) {
        return next(error)
      } else {
        console.log('user: ', user);
        
        return res.redirect('/profile')
      }
    })  
   
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
