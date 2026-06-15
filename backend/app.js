const createError = require("http-errors");
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

const RateLimit = require("express-rate-limit");

const initializePassport = require("./passportAuth");

// ✅ Mongoose
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);


const mongoDB = process.env.MONGO_URI;

async function main() {
  await mongoose.connect(mongoDB);
}
main().catch((err) => console.log(err));

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
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
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


// ---------------- ERROR HANDLING ----------------
app.use((err, req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(function (err, req, res, next) {
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