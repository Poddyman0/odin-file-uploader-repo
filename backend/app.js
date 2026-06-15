const createError = require("http-errors");
<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
const session = require("express-session");
const passport = require("passport");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const { Server } = require('socket.io');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const indexRouter = require('./routes/index');
const messagingAppRouter = require('./routes/messagingApp');
=======
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const http = require("http");
const { Server } = require("socket.io");
const { ObjectId } = require("mongodb");
const cloudinary = require('cloudinary').v2
const MongoStore = require("connect-mongo")(session);

require("dotenv").config();

const indexRouter = require("./routes/index");
const fileUploaderRouter = require("./routes/fileUploader");
>>>>>>> 815f6569b77c4377cbad15b14a2d1bedf7a85011

const RateLimit = require("express-rate-limit");

const initializePassport = require("./passportAuth");

<<<<<<< HEAD
// Mongo / Mongoose (your existing DB)
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGO_URI;

main().catch(err => console.log(err));
=======
// ✅ Mongoose
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);


const mongoDB = process.env.MONGO_URI;
>>>>>>> 815f6569b77c4377cbad15b14a2d1bedf7a85011

async function main() {
  await mongoose.connect(mongoDB);
}
<<<<<<< HEAD
=======
main().catch((err) => console.log(err));
>>>>>>> 815f6569b77c4377cbad15b14a2d1bedf7a85011

// ---------------- EXPRESS APP ----------------
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {}
});

// ---------------- MIDDLEWARE ----------------
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
});

app.use(limiter);
<<<<<<< HEAD
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(cors({
=======
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "frontend")));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

/*
app.use(cors({
>>>>>>> 815f6569b77c4377cbad15b14a2d1bedf7a85011
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
<<<<<<< HEAD

initializePassport();
app.use(session({
  secret: process.env.PASSPORT_PASSWORD,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// ---------------- ROUTES ----------------
app.use('/', indexRouter);
app.use("/messagingApp", messagingAppRouter);
=======
*/
initializePassport();

app.use(
  session({
  secret: process.env.PASSPORT_PASSWORD,
  resave: false,
  saveUninitialized: false,

  store: new MongoStore({
    url: process.env.MONGO_URI,
    collection: "sessions",
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
  },
  })
);

//app.use(session({...}));
app.use(passport.initialize());
app.use(passport.session());

//app.options("*", cors());
app.use((req, res, next) => {
  console.log("COOKIE HEADER:", req.headers.cookie);
  next();
});
// ---------------- ROUTES ----------------
app.use("/", indexRouter);
app.use("/fileUploader", fileUploaderRouter);



//cloudinary
cloudinary.config({ 
  cloud_name: 'dablidwxf', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});



/*
const url = cloudinary.url('testpic_kolmzs')
console.log(url)

;(async function () {
  const results = await cloudinary.uploader.upload('./uploads/testpic.jpg')
  console.log("results", results.public_id)
  const url = cloudinary.url(results.public_id)
  console.log("url", url)
})()
*/
// store file temporarily in memory (no disk needed)
>>>>>>> 815f6569b77c4377cbad15b14a2d1bedf7a85011


// ---------------- ERROR HANDLING ----------------
app.use((err, req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

<<<<<<< HEAD
app.use(function(err, req, res, next) {
=======
app.use(function (err, req, res, next) {
>>>>>>> 815f6569b77c4377cbad15b14a2d1bedf7a85011
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err.stack : undefined,
  });
});

// ---------------- SERVER START ----------------
const port = process.env.PORT || 3000;

server.listen(port, "0.0.0.0", function () {
  console.log(`Server running on port ${port}`);
});

module.exports = app;