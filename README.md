# MERN Stack Blog App

This is a MERN (MongoDB, Express.js, React, Node.js) stack-based blog application that allows users to create, read, update, and delete blog posts. The project is divided into two main folders - "client" for the frontend and "api" for the backend.

## Technologies Used

### Frontend (Client):
- React: A JavaScript library for building user interfaces.
- React Router: For handling client-side routing.

### Backend (API):
- Express.js: A web application framework for Node.js.
- MongoDB: A NoSQL database used to store blog post data.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB.
- bcrypt: For password hashing and authentication.
- JSON Web Tokens (JWT): For user authentication and authorization.
- Multer: A middleware for handling file uploads.

## Getting Started

### Prerequisites

- Node.js: Make sure you have Node.js installed. You can download it from [https://nodejs.org/](https://nodejs.org/).
- MongoDB: Install and configure a MongoDB instance. You can download MongoDB from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community).

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/prasanth7890/Blog-App.git

2. Install dependencies for both the client and API:
    ```bash
    cd client
    npm install
    cd ../api
    npm install

3. Create a .env file in the "api" folder and set the following environment variables:

    ```
    DB_URL=your_mongodb_connection_string
    SECRET=your_secret_key

4. Start the server (from the "api" folder) and the client application (from the "client" folder) separately:

    #### Start the API server
    nodemon server.js

    #### Start the client
    npm start


## Usage

Once the server and client are running, you can access the application by visiting http://localhost:3000 in your web browser.

The app allows users to:

   - Users can login and Register

   ![image](https://github.com/prasanth7890/Blog-App/assets/59390943/e8df02d4-96f0-4191-b24c-668330ff5d6b)

   - Create new blog posts

   ![image](https://github.com/prasanth7890/Blog-App/assets/59390943/29eeac82-81ce-4dcc-80a0-331312c3e6fc)

   - View existing blog posts

   ![image](https://github.com/prasanth7890/Blog-App/assets/59390943/e272b802-e222-46f1-9472-5a967aab9f42)

   - Edit and update blog posts

   ![image](https://github.com/prasanth7890/Blog-App/assets/59390943/e27f5ee8-cc3a-4bd1-83b8-9c4cc46f53cb)
   
