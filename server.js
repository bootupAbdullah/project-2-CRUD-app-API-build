// <------------------------------------------- Imports and Configuration ------------------------------------------------------>
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require('express')
const mongoose = require("mongoose"); // require package
// const methodOverride = require('method-override');
const app = express();



// <------------------------------------------- Database Connection------------------------------------------------------>

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });



// <------------------------------------------- Controllers ------------------------------------------------------>
// The server now uses MVC architecture, moving the Fruit model interactions from the main server file to a dedicated controller for better code organization
// const Fruit = require("./models/fruit.js");

const charactersCtrl = require("./controllers/characters");


// <------------------------------------------- ROUTES ------------------------------------------------------>




// <---------------------------------------------- HOME PAGE ---------------------------->
app.get('/', charactersCtrl.homePage);


// <---------------------------------------------- NEW CHARACTER REQUEST ROUTE  ---------------------------->
app.get('/characters/new', charactersCtrl.newCharacterRequest);


// <---------------------------------------------- NEW CHARACTER REQUEST ROUTE  ---------------------------->




// <------------------------------------------- Start Server ------------------------------------------------------>
app.listen(3003, () => {
    console.log('Listening on port 3003, Project-2-IS-A-GO!')
});