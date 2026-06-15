#! /usr/bin/env node

console.log(
    'This script populates some test users, files and folders into the database.'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const User = require("./models/userModel");
  const File = require("./models/fileModel");
  const Folder = require("./models/folderModel");
  
  const users = [];
  const files = [];
  const folders = []
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createUsers();
    await createFiles()
    await createFolders();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  

  async function userCreate(index, username, email, password) {
    const user = new User({ 
      username: username,
      email: email,
      password: password
    });
    await user.save();
    users[index] = user;
    console.log(`Added user with email: ${email}`);
  }

  //here
  async function fileCreate(index, author, name, size, uploadTime, fileURL) {
    const file = new File ({ 
        author: author,
        name: name,
        size: size,
        uploadTime: uploadTime,
        fileURL: fileURL
    })

    await file.save();
    files[index] = file;
    console.log(`Added file with name: ${name}`);
  }
  
  async function folderCreate(index, author, name, files) {
    const folder = new Folder ({ 
      author: author,
      name: name,
      files: files
    })

    await folder.save();
    folders[index] = folder;
    console.log(`Added folder with name: ${name}`);
  }


  async function createUsers() {
    console.log("Adding users");
    await Promise.all([
      userCreate(0, "user1", "user1@domain.com", "password1"),
      userCreate(1, "user2", "user2@domain.com", "password2"),
    ]);
  }

  async function createFiles() {
    console.log("Adding files");
    await Promise.all([
        fileCreate(0, users[0], "file 1", "100", "2026-06-06T14:30:00Z", "https://res.cloudinary.com/dablidwxf/image/upload/v1780071488/main-sample.png"),
        fileCreate(1, users[0], "file 2", "75", "2026-05-20T08:15:42Z", "https://res.cloudinary.com/dablidwxf/image/upload/v1780071488/cld-sample-5.jpg"),
        fileCreate(2, users[1], "file 3", "50", "2025-12-01T17:45:10Z", "https://res.cloudinary.com/dablidwxf/image/upload/v1780071488/cld-sample-4.jpg"),
        fileCreate(3, users[1], "file 4", "25", "2026-06-06T14:30:00Z", "https://res.cloudinary.com/dablidwxf/image/upload/v1780071488/cld-sample-4.jpg"),
    ]);
  }
  
  async function createFolders() {
    console.log("Adding folders");
    await Promise.all([
        folderCreate(0, users[0], "folder1", [files[0], files[1]]), 
        folderCreate(0, users[1], "folder2", [files[2], files[3]]), 

    ]);
  }

 