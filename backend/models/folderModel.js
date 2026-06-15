const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FolderSchema = new Schema({
    author:{type: Schema.Types.ObjectId, ref: "User", required: true},
    name: {type: String, required: true},
    files: [{type: Schema.Types.ObjectId, ref: "File", required: true}],
    shareExpiresAt: {type: Date}
})



module.exports = mongoose.model("Folder", FolderSchema);