# File Uploader

## Overview

File Uploader is a full-stack cloud storage application that I built as part of The Odin Project's Node.js curriculum. The goal of the project was to create a simplified version of a personal file storage service similar to Google Drive, allowing authenticated users to upload, organize, manage, and download files through a web interface.

This project provided valuable experience working with authentication, file handling, cloud storage integration, database design, and user-specific content management. Throughout development, I focused on creating a secure and organized file management system where users could store files within folders and access detailed information about their uploaded content.

---

# Project Goals

The primary objectives of this project were to:

* Build a full-stack Express application.
* Implement secure user authentication.
* Manage user sessions using Passport.js.
* Create a relational database using Prisma and PostgreSQL.
* Allow users to upload and organize files.
* Integrate cloud storage for file hosting.
* Implement folder management functionality.
* Provide file metadata and download capabilities.
* Validate uploaded files for security and performance.

---

# Technologies Used

## Backend

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* Passport.js
* Express Session
* bcrypt

## File Management

* Multer
* Cloudinary

## Frontend

* HTML5
* CSS3
* JavaScript
* EJS

## Development Tools

* Git
* GitHub

---

# Authentication System

To ensure that user files remained private and secure, I implemented session-based authentication using Passport.js.

## User Registration

Users can create an account by providing their credentials.

During registration:

* User information is validated.
* Passwords are securely hashed using bcrypt.
* User records are stored in the database.

Passwords are never stored in plain text.

---

## User Login

Authenticated users can sign in using their credentials.

Upon successful authentication:

* A session is created.
* Session data is stored in the database.
* Users gain access to their personal storage area.

Unauthenticated visitors are prevented from accessing protected routes.

---

## Session Persistence

I used Prisma Session Store to persist session information within PostgreSQL.

This allows sessions to remain active between requests while maintaining security and reliability across application restarts.

---

# Database Design

The application uses Prisma ORM to manage database interactions.

The database is structured around relationships between users, folders, and files.

## User Model

Each user contains:

* Account information
* Authentication credentials
* Associated folders
* Associated files

Users only have access to their own content.

---

## Folder Model

Folders provide organization for uploaded files.

Each folder stores:

* Folder name
* Creation date
* Owner information

Folders belong to a specific user and can contain multiple files.

---

## File Model

Each uploaded file stores:

* File name
* File size
* Upload date
* Cloud storage URL
* Parent folder
* Owner information

The file model serves as the central connection between users, folders, and cloud storage.

---

# Folder Management

A key feature of the application is folder organization.

Users can fully manage their folder structure through standard CRUD operations.

## Create Folders

Users can create new folders to organize uploaded files.

---

## View Folders

Users can browse all folders associated with their account.

Each folder displays its contents and related files.

---

## Update Folders

Users can rename existing folders to better organize their storage.

---

## Delete Folders

Users can remove folders when they are no longer needed.

Folder management functionality helps create a structured file storage experience similar to commercial cloud storage platforms.

---

# File Upload System

One of the core features of the application is file uploading.

## Multer Integration

I integrated Multer middleware to process incoming file uploads.

Multer handles:

* File parsing
* Upload processing
* Request handling

This allows files to be safely received from user forms.

---

## Cloud Storage Integration

Rather than storing files directly inside the database, I integrated Cloudinary as the application's storage provider.

When a user uploads a file:

1. The file is processed by Multer.
2. The file is uploaded to Cloudinary.
3. Cloudinary returns a secure file URL.
4. The URL and file metadata are stored in PostgreSQL.

This approach improves scalability and avoids storing large binary data inside the database.

---

## Upload Workflow

The complete upload process includes:

* File selection
* Validation checks
* Upload to cloud storage
* Database record creation
* File association with a folder

Once completed, users can immediately access the uploaded file through the application.

---

# File Validation

To improve security and prevent abuse, I implemented file validation during uploads.

Validation rules include:

* Restricting unsupported file types
* Enforcing maximum file size limits
* Rejecting invalid uploads before processing

These safeguards help ensure that only acceptable files are stored within the system.

---

# File Details Page

Each uploaded file has its own details page.

The file details view displays important metadata, including:

* File name
* File size
* Upload date
* Associated folder

This provides users with useful information about their stored content.

---

# File Downloads

Users can download files directly from the application.

The download functionality retrieves the stored file through its Cloudinary URL and allows users to access their uploaded content whenever needed.

This completes the core storage lifecycle of:

* Upload
* Organize
* View
* Download

---

# User Experience

The application was designed to provide a straightforward file management experience.

Users can:

1. Create an account.
2. Log in securely.
3. Create folders.
4. Upload files into folders.
5. Browse stored content.
6. View file information.
7. Download files when needed.

This workflow closely mirrors the basic functionality of modern cloud storage applications.

---

# Security Considerations

Several security measures were implemented throughout development.

These include:

* Password hashing with bcrypt
* Session-based authentication
* Route protection middleware
* User ownership verification
* File validation checks
* Secure cloud storage integration

These measures help ensure that users can only access and manage their own files and folders.

---

# Challenges

One of the most challenging aspects of this project was integrating multiple systems together. Authentication, database management, file processing, cloud storage, and folder organization all needed to work seamlessly within a single application.

Another challenge involved designing the database relationships between users, folders, and files. Careful planning was required to ensure files remained properly linked to both their owner and their parent folder.

Working with file uploads also introduced additional complexity, particularly when validating uploads and managing cloud-hosted file URLs.

These challenges provided valuable experience building applications that combine multiple technologies and external services.

---

# Key Skills Demonstrated

* Full-Stack Web Development
* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* Passport.js Authentication
* Session Management
* Database Design
* File Upload Handling
* Multer Middleware
* Cloudinary Integration
* CRUD Operations
* Route Protection
* Data Validation
* MVC Architecture
* RESTful Routing
* Git & GitHub

---

# Outcome

This project allowed me to build a complete cloud storage application from the ground up while gaining experience with authentication, file management, database relationships, and third-party storage services. By combining Express, Prisma, PostgreSQL, Passport.js, Multer, and Cloudinary, I created a secure and organized platform where users can upload, manage, and download files through a streamlined interface.

The project strengthened my understanding of full-stack application development and provided valuable experience working with real-world features commonly found in modern cloud storage platforms.
