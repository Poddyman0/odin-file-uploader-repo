// config/passportAuth.js

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
<<<<<<< HEAD
const bcrypt = require("bcryptjs");
const Profile = require("./models/profileModel");
=======
const User = require("./models/userModel");
>>>>>>> 815f6569b77c4377cbad15b14a2d1bedf7a85011

function initializePassport() {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },

      async (email, password, done) => {
        try {
<<<<<<< HEAD
          const profile = await Profile.findOne({ email });

          if (!profile) {
=======
          const user = await User.findOne({ email });

          if (!user) {
>>>>>>> 815f6569b77c4377cbad15b14a2d1bedf7a85011
            return done(null, false, {
              message: "Incorrect email",
            });
          }

<<<<<<< HEAD
          const passwordMatch = await bcrypt.compare(
            password,
            profile.password
          );

          if (!passwordMatch) {
=======


          if (user.password !== password) {
>>>>>>> 815f6569b77c4377cbad15b14a2d1bedf7a85011
            return done(null, false, {
              message: "Incorrect password",
            });
          }

<<<<<<< HEAD
          return done(null, profile);
=======
          return done(null, user);
>>>>>>> 815f6569b77c4377cbad15b14a2d1bedf7a85011

        } catch (err) {
          return done(err);
        }
      }
    )
  );

<<<<<<< HEAD
  passport.serializeUser((profile, done) => {
    done(null, profile.id);
=======
  passport.serializeUser((user, done) => {
    done(null, user.id);
>>>>>>> 815f6569b77c4377cbad15b14a2d1bedf7a85011
  });

  passport.deserializeUser(async (id, done) => {
    try {
<<<<<<< HEAD
      const profile = await Profile.findById(id);
      done(null, profile);
=======
      const user = await User.findById(id);
      done(null, user);
>>>>>>> 815f6569b77c4377cbad15b14a2d1bedf7a85011
    } catch (err) {
      done(err);
    }
  });
}

module.exports = initializePassport;
<<<<<<< HEAD
/*


  //below needed? 
  app.use((req, res, next) => {
    res.locals.currentUser = req.profile;
    next();
  });

  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

//in profileController

// GET request to login a user.
exports.user_login_get = (req, res) => {
    res.render("user_login", {user: res.locals.currentUser});
}

*/
=======




>>>>>>> 815f6569b77c4377cbad15b14a2d1bedf7a85011






