<<<<<<< HEAD
# Messaging App

## Overview

For this project, I built a full-stack messaging application that allows users to communicate with one another through direct messages. The goal of the project was to simulate the core functionality of modern messaging platforms such as Discord, WhatsApp, and Facebook Messenger while focusing on backend architecture, authentication, and structured data modeling.

This project challenged me to design a system that supports user accounts, message exchange between users, and profile customization. I also had to carefully plan the application structure since messaging systems involve continuous interaction between multiple users and complex relational data.

---

## Project Goals

The main objectives of this project were to:

* Build a secure authentication system.
* Allow users to send and receive messages.
* Enable users to customize their profiles.
* Design a relational database to manage users and conversations.
* Develop a responsive and functional full-stack web application.
* Deploy the application for public access.

---

## Core Features

The application includes the following core functionality:

* User registration and login system.
* Secure authentication and session handling.
* Direct messaging between users.
* User profile customization.
* Viewing user profiles and message history.

---

## Technologies Used

### Backend
=======
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
>>>>>>> 815f6569b77c4377cbad15b14a2d1bedf7a85011

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* Passport.js
* Express Session
* bcrypt

<<<<<<< HEAD
### Frontend
=======
## File Management

* Multer
* Cloudinary

## Frontend
>>>>>>> 815f6569b77c4377cbad15b14a2d1bedf7a85011

* HTML5
* CSS3
* JavaScript
<<<<<<< HEAD
* EJS (templating engine)

### Development Tools
=======
* EJS

## Development Tools
>>>>>>> 815f6569b77c4377cbad15b14a2d1bedf7a85011

* Git
* GitHub

---

<<<<<<< HEAD
## Authentication System

Authentication is a core part of the application and ensures that only registered users can access messaging features.

### Registration

Users can create an account by providing credentials. During registration:

* Input data is validated.
* Passwords are hashed using bcrypt before storage.
* User records are saved in the database.

---

### Login

Users log in using their credentials.

Once authenticated:

* A session is created using Express Session.
* The session is persisted in the database.
* Users gain access to messaging features and profiles.

---

### Route Protection

All messaging routes are protected, meaning only authenticated users can:

* View messages
* Send messages
* Access other user profiles

---

## Database Design

I used Prisma ORM to design and manage the database structure. The database is centered around users and messages.

---

### User Model

Each user contains:

* Username
* Email
* Password hash
* Profile information (such as bio or display name)
* Account metadata

Users can:

* Send messages
* Receive messages
* Update their profile

---

### Message Model

Each message contains:

* Sender user ID
* Receiver user ID
* Message content
* Timestamp

Messages are stored in a relational structure that allows efficient querying between two users.

---

## Messaging System

The core feature of the application is direct messaging between users.

### Sending Messages

Users can send messages to another user by selecting their profile or entering their username. When a message is sent:

1. The sender submits message content.
2. The backend validates and stores the message.
3. The message is saved with sender and receiver references.

---

### Receiving Messages

Messages are retrieved from the database based on the authenticated user. Each user can view:

* Messages they have sent
* Messages they have received

This creates a complete conversation history between users.

---

### Message History

The application displays message history in chronological order, allowing users to follow conversations naturally.

---

## User Profiles

Each user has a customizable profile page.

### Profile Features

Users can:

* View their profile information
* Edit profile details
* View messages associated with their account

Profiles act as the central identity hub for each user within the application.

---

## User Interface

The user interface was designed to be simple and functional, focusing on usability rather than unnecessary complexity.

### Key Pages

* Login page
* Registration page
* User dashboard
* Messaging interface
* Profile page
* User directory

### Messaging Interface

The messaging UI allows users to:

* Select a conversation partner
* View message history
* Send new messages instantly
* Scroll through conversations

---

## Application Flow

1. A user registers or logs in.
2. The user is redirected to the main dashboard.
3. The user selects another user to message.
4. Messages are sent and stored in the database.
5. The conversation updates when the page is refreshed.
6. Users can continue conversations at any time.

---

## Data Handling

All messaging data is handled through RESTful API routes.

The system follows a request-response model:

* Users send requests when they perform actions (like sending a message).
* The server processes the request and returns updated data.
* The frontend updates based on the response.

Because this project uses a traditional REST architecture, real-time updates are not implemented. Messages appear after refresh or re-fetching data.

---

## Security Considerations

To ensure the safety of user data, I implemented several security measures:

* Password hashing with bcrypt
* Session-based authentication
* Protected routes for messaging and profiles
* User validation on all message submissions
* Ownership checks for user data access

These measures ensure users can only access their own data and authorized content.

---

## Deployment

After development, I deployed the application to a hosting platform.

The deployment process included:

* Configuring environment variables
* Setting up a production database
* Deploying the Express server
* Testing authentication and messaging in production

The final application is accessible online and fully functional.

---

## Challenges

One of the main challenges in this project was designing the messaging system in a way that efficiently handled relationships between users. Since each message involves both a sender and receiver, I had to carefully structure the database to support fast querying and clear data relationships.

Another challenge was managing message retrieval and display in a clean and organized way, especially when handling multiple conversations between users.

Additionally, working within a REST API architecture meant that real-time messaging was not possible, so I had to design a system that still provided a smooth user experience without live updates.

---

## Key Skills Demonstrated
=======
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
>>>>>>> 815f6569b77c4377cbad15b14a2d1bedf7a85011

* Full-Stack Web Development
* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* Passport.js Authentication
* Session Management
<<<<<<< HEAD
* RESTful API Design
* Database Modeling
* User-to-User Communication Systems
* Secure Authentication Practices
* MVC Architecture
* Deployment
=======
* Database Design
* File Upload Handling
* Multer Middleware
* Cloudinary Integration
* CRUD Operations
* Route Protection
* Data Validation
* MVC Architecture
* RESTful Routing
>>>>>>> 815f6569b77c4377cbad15b14a2d1bedf7a85011
* Git & GitHub

---

<<<<<<< HEAD
## Outcome

This project allowed me to build a fully functional messaging application from scratch while gaining hands-on experience with authentication systems, relational database design, and user-to-user communication logic. By implementing secure login functionality and a structured messaging system, I developed a deeper understanding of how modern messaging platforms manage and store user interactions.

The final result is a working full-stack messaging app that demonstrates my ability to design and build scalable web applications with real-world functionality.
=======
# Outcome

This project allowed me to build a complete cloud storage application from the ground up while gaining experience with authentication, file management, database relationships, and third-party storage services. By combining Express, Prisma, PostgreSQL, Passport.js, Multer, and Cloudinary, I created a secure and organized platform where users can upload, manage, and download files through a streamlined interface.

The project strengthened my understanding of full-stack application development and provided valuable experience working with real-world features commonly found in modern cloud storage platforms.
>>>>>>> 815f6569b77c4377cbad15b14a2d1bedf7a85011
