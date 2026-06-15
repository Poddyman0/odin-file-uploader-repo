const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FileSchema = new Schema({
    author:{type: Schema.Types.ObjectId, ref: "User", required: true},
    name: {type: String, required: true},
    size: {type: String, required: true},
    uploadTime: { type: Date, default: Date.now },
    fileURL: {type: String, required: true}
})



module.exports = mongoose.model("File", FileSchema);