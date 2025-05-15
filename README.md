# Project Title

BED CA2
Tan Shu Er, Suzanna
P2323415
DIT/1B/FT/03

In this project, we've developed a sustainability task tracker designed to monitor users' task completions. 
Upon finishing a task, users earn a specified number of points, which can then be utilized in the Pet World --
a gamified section of the tracker. In the Pet World, users can use their accumulated points to purchase boxes, 
each containing a randomly assigned pet that they can "save." This adds an element of luck and encourages users
to complete more tasks to save more pets, fostering a sense of sustainability.

Moreover, users have the opportunity to raise awareness and share their sustainable practices by posting messages
on a global page. The overarching goal of this sustainability task tracker is to promote eco-friendly habits and
showcase users' efforts within the game. The concept of "saving" pets serves as a metaphor, illustrating that by
adopting sustainable practices and contributing to the well-being of the Earth, users can play a role in saving animals.

## Folder Structure

```
save-the-pets        
├─ public                        
│  ├─ css
│  │  ├─ color.css         
│  │  └─ style.css                                     
│  ├─ js
│  │  ├─ createPet.js         
│  │  ├─ displayPetWorld.js     
│  │  ├─ editTasks.js         
│  │  ├─ getCurrentURL.js     
│  │  ├─ loginUser.js         
│  │  ├─ queryCmds.js     
│  │  ├─ registerUser.js         
│  │  ├─ showAllBox.js     
│  │  ├─ showAllMessages.js         
│  │  ├─ showAllPets.js     
│  │  ├─ showAllPetShop.js         
│  │  ├─ showAllTasks.js     
│  │  ├─ showMyMessages.js     
│  │  ├─ showTasksIndex.js         
│  │  └─ userNavbarToggle.js 
│  ├─ admin.html  
│  ├─ index.html               
│  ├─ message.html   
│  ├─ mymessages.html              
│  ├─ pets.html               
│  ├─ petshop.html              
│  ├─ petworld.html
│  ├─ register.html
│  └─ tasks.html      
├─ src                           
│  ├─ configs                    
│  │  ├─ createSchema.js         
│  │  └─ initTables.js           
│  ├─ controllers    
│  │  ├─ boxController.js         
│  │  ├─ messageController.js           
│  │  ├─ petController.js         
│  │  ├─ petshopController.js     
│  │  ├─ taskprogressController.js         
│  │  ├─ tasksController.js     
│  │  └─ usersController.js         
│  ├─ middlewares  
│  │  ├─ bcryptMiddleware.js     
│  │  └─ jwtMiddleware.js                   
│  ├─ models       
│  │  ├─ boxModel.js         
│  │  ├─ messageModel.js           
│  │  ├─ petModel.js         
│  │  ├─ petshopModel.js     
│  │  ├─ taskprogressModel.js         
│  │  ├─ tasksModel.js     
│  │  └─ usersModel.js                  
│  ├─ routes        
│  │  ├─ boxRoutes.js         
│  │  ├─ mainRoutes.js           
│  │  ├─ messageRoutes.js           
│  │  ├─ petRoutes.js         
│  │  ├─ petshopRoutes.js     
│  │  ├─ taskprogressRoutes.js         
│  │  ├─ tasksRoutes.js     
│  │  └─ usersRoutes.js               
│  ├─ services                   
│  │  └─ db.js                   
│  └─ app.js                      
├─ index.js                      
├─ package.json                  
└─ README.md                     
```

## Prerequisites

Before running the tests, ensure that the following dependencies are installed:

- Node.js
- npm (Node Package Manager)
- Chromium browser (Playwright will use this as the default browser)

## Clone the Repository

1. Open Visual Studio Code (VSCode) on your local machine.

2. Click on the "Source Control" icon in the left sidebar (the icon looks like a branch).

3. Click on the "Clone Repository" button.

4. In the repository URL input field, enter `https://github.com/suzannaaa/save-the-pets`.

5. Choose a local directory where you want to clone the repository.

6. Click on the "Clone" button to start the cloning process.

## Setting Up Environment Variables

This repository provides instructions for setting up environment variables using a `.env` file in an Express.js application. The environment variables will be used in the `db.js` file located in the `src/services` directory.

### Setup

To set up environment variables for your Express.js application, follow these steps:

1. Create a file named `.env` in the root directory of your project.
2. Open the `.env` file and add the following lines:

   ```
   DB_HOST=<your_database_host>
   DB_USER=<your_database_user>
   DB_PASSWORD=<your_database_password>
   DB_DATABASE=<your_database_name>
   JWT_SECRET_KEY=<your_secret_key>
   JWT_EXPIRES_IN=<duration>
   JWT_ALGORITHM=<selected_algorithm>
   ```

   Replace `<your_database_host>`, `<your_database_user>`, `<your_database_password>`, and `<your_database_name>` with the appropriate values for your database connection.

   Replace `<your_secret_key>`, `<duration>`, and `<selected_algorithm>` with the appropriate values for your JSON web token usage.

   For example:

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=1234
   DB_DATABASE=petworld
   JWT_SECRET_KEY=your-secret-key
   JWT_EXPIRES_IN=15m
   JWT_ALGORITHM=HS256
   ```

   Note: Make sure there are no spaces around the equal sign (=) in each line.

3. Save the `.env` file.

### Usage

The `db.js` file in the `src/services` directory uses the `dotenv` package to read the `.env` file and set the environment variables. Here's an example of how the `db.js` file should look:

```javascript
require('dotenv').config(); // Read .env file and set environment variables

const mysql = require('mysql2');

const setting = {
    connectionLimit: 10, // Set limit to 10 connections
    host: process.env.DB_HOST, // Get host from environment variable
    user: process.env.DB_USER, // Get user from environment variable
    password: process.env.DB_PASSWORD, // Get password from environment variable
    database: process.env.DB_DATABASE, // Get database from environment variable
    multipleStatements: true, // Allow multiple SQL statements
    dateStrings: true // Return date as string instead of Date object
}

const pool = mysql.createPool(setting);

module.exports = pool;
```

The `dotenv` package is used to load the environment variables from the `.env` file, and `process.env` is used to access these variables in your code.

Make sure to include the `require('dotenv').config();` line at the beginning of your file to load the environment variables from the `.env` file.

## Important Note

Ensure that the `.env` file is included in your `.gitignore` file to prevent sensitive information (such as database credentials) from being exposed in your version control system.

That's it! You have successfully set up environment variables using a `.env` file in your Express.js application. These variables can now be accessed in the `db.js` file or any other part of your application where needed.

Now you can move on to next part below.

## Install Dependencies

1. Open the terminal in VSCode by going to `View` > `Terminal` or using the shortcut `Ctrl + ``.

2. Navigate to the project root directory.

3. Install the required dependencies using npm:

   ```
   npm install
   ```

## Database Initialization

1. Make sure you have a MySQL database available for the mock test. Update the database configuration details in the `.env` file.

2. To initialize the database tables and populate them with sample data, open the terminal in VSCode and run the following command:

   ```
   npm run init_tables
   ```

## Running the Program

1. To run the program, open the terminal in VSCode and run the following command:

   ```
   npm run dev 
   ```

   OR

   ```
   npm start 
   ```

### Opening on Browser

To run the program on your browser, follow these steps:

1. Go to a browser of your preference

2. In the URL input field, enter `http://localhost:3000/index.html`.


## Additional Information

Please note that running the program assumes:

- The presence of a MySQL database and use the `mysql2` package for database interactions. Make sure to configure the database connection details in your Express.js application.

- The usage of the `pool` object from `src/services/db.js` for database operations.