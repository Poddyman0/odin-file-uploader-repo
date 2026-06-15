const express = require('express');
const router = express.Router();
const user_controller = require("../controllers/userController")
const file_controller = require("../controllers/fileController")
const folder_controller = require("../controllers/folderController")
const passport = require("passport");
const upload = require("../multerCloudindry");
const ensureAuthenticated = require('../passportAuthenticated')



//Users should be able to sign in using your chosen authentication method.
router.post(
    `/user/put/signin/:id`,
    passport.authenticate("local", {
      successRedirect: `/user/get/:id/auserID`,
      failureRedirect: `/user/put/signin/:id`
    })
  );

  //Users should be able to sign in using your chosen authentication method.
router.post(
    `/user/put/signin/:id`,
    passport.authenticate("local", {
      successRedirect: `/user/get/:id/auserID`,
      failureRedirect: `/user/put/signin/:id`
    })
  );

//done
// GET request to get a user by email
router.get("/user/get/auserEmail/:email",
user_controller.user_get_email
)


// POST passport request to update and sign out of  a user.
router.post("/user/put/signout/:id/passport", ensureAuthenticated,
user_controller.user_sign_out_post_passport
)

// POST passport request to login user
router.post("/user/put/signin/:id/passport", 
user_controller.user_sign_in_post_passport
);

// READ Folders
router.get("/folders/get/:id", ensureAuthenticated,
folder_controller.read_folders
)

// READ Folder
router.get("/folder/get/:id/get", ensureAuthenticated,
folder_controller.read_folder
)

// READ file
router.get("/file/get/:id/get", ensureAuthenticated,
file_controller.read_file
)

// DOWNLOAD file
router.get("/file/get/:id/download", ensureAuthenticated,
  file_controller.download_file
)

// CREATE folder
router.post("/folder/post/create", ensureAuthenticated,
folder_controller.create_folder
)

// UPDATE Folder
router.post("/folder/put/:id/update", ensureAuthenticated,
folder_controller.update_folder
)

// DELETE folder
router.post("/folder/delete/:id/delete", ensureAuthenticated,
folder_controller.delete_folder
)

//POST: users can upload pictures.
router.post("/file/create/:author/:name/:folder", upload.single("image"), ensureAuthenticated,
file_controller.file_upload
)

//POST share Folder
router.post("/share/:id/auth", ensureAuthenticated,
folder_controller.share_folder
)

//POST share Folder
router.get("/share/:id",
folder_controller.share_folder_no_auth
)










module.exports = router;
