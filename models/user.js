var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  favoriteBook: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// authenticate the credentials against database documents
// Create the OWN method called authenticate
UserSchema.statics.authenticate = (email, password, callback)=>{
  User.findOne({ email: email }).exec((err, user) => {
    if (err) {
      return callback(err);
    } else if (!user) {
      var err = new Error("User not found.");
      err.status = 401;
      callback(err);
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result === true) {
        return callback(null, result);
      } else {
        return callback();
      }
    }
  
    
  );
  });
};




// hash password before saving to database
UserSchema.pre("save", function(next) {
  var user = this; // refer to the UserSchema instance

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

// Export that models
var User = mongoose.model("User", UserSchema);
module.exports = User;
