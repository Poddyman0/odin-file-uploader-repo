const User = require("../models/userModel")
const File = require("../models/fileModel")
const Folder = require("../models/folderModel")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { trusted } = require("mongoose");
const passport = require("passport");
const fs = require("fs");
const cloudinary = require('cloudinary').v2


//GET request to get a Profile by email
exports.user_get_email = asyncHandler(async (req, res, next) => {
    const aUser = await User.find({ email: req.params.email}).exec();
    if (!aUser) {
        res.json({
            profileID: aUser[0]._id,
            msg: "User get unsuccessfull as profile does not exist"
        })
    } else {
        res.json({
          profileID: aUser[0]._id,
          msg: "User get successfull"
        })
    }
  })


exports.user_sign_out_post_passport = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy(() => {
      res.clearCookie("connect.sid");

      res.json({
        msg: "Logged out",
      });
    });
  });
})
  

  exports.user_sign_in_post_passport = [
    body("email")
      .trim()
      .isEmail()
      .withMessage("email must be a valid email")
      .escape(),
  
    body("password")
      .trim()
      .isLength({ min: 1 })
      .withMessage("password must contain at least 1 characters")
      .escape(),
  
    asyncHandler(async (req, res, next) => {

      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
      }
  
      next();
    }),
    (req, res, next) => {
      passport.authenticate("local", (err, user, info) => {


        if (err) return next(err);
  
        if (!user) {
          return res.json({ msg: "Login failed" });
        }
  
        req.logIn(user, (err) => {
          if (err) return next(err);
  
          return res.json({
            msg: "Session login success",
          });
        });
  
      })(req, res, next); 
    }
  ];
