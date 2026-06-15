const User = require("../models/userModel")
const File = require("../models/fileModel")
const Folder = require("../models/folderModel")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { trusted } = require("mongoose");
const passport = require("passport");
const fs = require("fs");
const cloudinary = require('cloudinary').v2

exports.read_file = asyncHandler(async (req, res, next) => {
 const aFile = await File.findById(req.params.id).exec()
 if (aFile) {
    res.json({
        file: aFile,
        msg: "File get successfull"
    })
} else if (!aFile) {
    res.json({
        file: aFile,
        msg: "File get unsuccessfull as ID does not exist"
    })
}
})

exports.download_file = asyncHandler(async (req, res, next) => {
    const aFile = await File.findById(req.params.id).exec()
    console.log(aFile)

   })

exports.file_upload = asyncHandler(async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      if (result.bytes > 1000000) {
        return res.json({
          msg: "File upload unsuccessful as file is too large",
        });
      } else {
        console.log("result", result)
        const aFile = new File ({
          author: req.params.author,
          name: req.params.name,
          size: result.bytes,
          uploadTime: result.created_at,
          fileURL: result.secure_url
        })
        await aFile.save();  
        console.log("aFile._id", aFile._id)
        const aFolder = await Folder.findById(req.params.folder)
        aFolder.files.push(aFile._id)
        await aFolder.save()
        console.log("aFile", aFile)
        console.log("aFolder", aFolder)
        fs.unlinkSync(req.file.path);  
        return res.json({
          file: aFile,
          msg: "File upload successful",
        });
      }  
    } catch (err) {
      console.error("ERROR:", err);
  
      return res.status(500).json({
        msg: "file upload failed",
        error: err.message,
      });
    }
  });