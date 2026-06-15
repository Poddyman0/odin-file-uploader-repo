const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sharedFolderSchema = new mongoose.Schema({
    folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", required: true},
    token: { type: String, required: true},
    expiresAt: {type: Date, required: true}
  });

  module.exports = mongoose.model("Share", sharedFolderSchema);