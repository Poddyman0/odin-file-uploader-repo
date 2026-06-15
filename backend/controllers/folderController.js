const User = require("../models/userModel")
const File = require("../models/fileModel")
const Folder = require("../models/folderModel")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { trusted } = require("mongoose");
const passport = require("passport");
const fs = require("fs");
const cloudinary = require('cloudinary').v2

exports.read_folders = asyncHandler(async (req, res, next) => {
    const allFolders = await Folder.find({author: req.params.id}).exec()
    console.log("allFolders", allFolders)
    if (allFolders) {
        res.json({
            folders: allFolders,
            msg: "folders get successfull"
        })
    }
})

exports.read_folder = asyncHandler(async (req, res, next) => {
    const aFolder = await Folder.findById(req.params.id).exec()
    const allFiles = await File.find({}).exec()
    let aFolderCopy = {
        author: aFolder.author,
        name: aFolder.name,
        files: []
    }
    aFolder.files.forEach(file => {
        allFiles.forEach(fileTwo => {
            if (`${file}` === `${fileTwo._id}`) {
                let fileCopy = {
                    _id: fileTwo._id,
                    name: fileTwo.name
                }
                aFolderCopy.files.push(fileCopy)
            }
        })
    })
    console.log("aFolderCopy", aFolderCopy)
    if (aFolder) {
        res.json({
            folder: aFolderCopy,
            msg: "folder get successfull"
        })
    } else if (!aFolder) {
        res.json({
            folder: aFolderCopy,
            msg: "folder get unsuccessfull as ID does not exist"
        })
    }
})

exports.create_folder = [
    body("author", "author must contain at least 1 characters")
    .isLength({ min: 1 }).withMessage('author must have at least 1 character'),
body("name", "name must contain at least 1 characters")
    .isLength({ min: 1 }).withMessage('name must have at least 1 character'), 
body("files", "files must contain at least 1 characters")
    .isArray().withMessage('files must have at least 1 character'),  
    asyncHandler(async (req, res, next) => {
        console.log("hi")
    const aFolder = new Folder({
        author: req.body.author,
        name: req.body.name,
        files: req.body.files
    })


    const errors = validationResult(req);
        if (!errors.isEmpty()) {
        res.json({
            folder: aFolder,
            errors: errors.array(),
            msg: "errors",
        }) 
        } else {
        await aFolder.save();
        res.json({
            folder: aFolder,
            msg: "Folder Created Successfully",
        })
        } 
    })
]

exports.update_folder = [
    body("author", "author must contain at least 1 characters")
    .isLength({ min: 1 }).withMessage('author must have at least 1 character'),
body("name", "name must contain at least 1 characters")
    .isLength({ min: 1 }).withMessage('name must have at least 1 character'), 
body("files", "files must contain at least 1 characters")
    .isArray().withMessage('files must have at least 1 character'),  
    asyncHandler(async (req, res, next) => {
    const aFolder = new Folder({
        _id: req.params.id,
        author: req.body.author,
        name: req.body.name,
        files: req.body.files
    })

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
        res.json({
            folder: aFolder,
            errors: errors.array(),
            msg: "errors",
        }) 
        } else {
            await Folder.findByIdAndUpdate(req.params.id, aFolder, {});
            res.json({
            folder: aFolder,
            msg: "Folder Updated Successfully"
        })
        } 
    })
]

exports.delete_folder = asyncHandler(async (req, res, next) => {
    const aFolderExists = await Folder.findById(req.params.id)
    if (req.params.id === null) {
        res.json({
            folder: aFolderExists,
            msg: "Folder ID does not exist"
        })
    } else {
        const aFolder = await Folder.findByIdAndDelete(req.params.id).exec();
        res.json({
            folder: aFolder,
            msg: "Folder deleted successfully" 
        })
    }
})

function parseDuration(duration) {
    const num = parseInt(duration);
    const unit = duration.replace(num, "");
  
    const map = {
      d: 24 * 60 * 60 * 1000,
      h: 60 * 60 * 1000,
      m: 60 * 1000
    };
  
    return Date.now() + (num * map[unit]);
  }

exports.share_folder = asyncHandler(async (req, res, next) => {
    let folderID = req.params.id
    let shareDuration = req.body.duration
    console.log("hi")
    const expiry = parseDuration(shareDuration);
    console.log("expiry", expiry)
    const folder = await Folder.findByIdAndUpdate(folderID, {
        shareExpiresAt: expiry,
      }, {});
      res.json({
        shareLink: `http://localhost:3000/share/${folderID}`
      });
    
})

exports.share_folder_no_auth = asyncHandler(async (req, res, next) => {
    const folder = Folder.findById(req.params.id)
    if (!folder) {
        return res.json({ msg: "Invalid folder ID" });
      } else if (Date.now() > folder.shareExpiresAt) {
        return res.json({ msg: "Link expired" });
      } else {
        res.json({
            folder: folder,
            msg: "folder get successful"
        })
      }

})