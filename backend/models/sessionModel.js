const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionSchema = new mongoose.Schema({
      sessionId: {type: String, required: true},
      session: {type: String, required: true},
      expires: { type: Date },
});

  module.exports = mongoose.model("Session", sessionSchema);