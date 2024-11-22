// <------------------------------------------- IMPORT AND CONFIGURATION ------------------------------------------------------>
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require('express')
const mongoose = require("mongoose"); // require package
// const methodOverride = require('method-override');
const app = express();

// <------------------------------------------- DATABASE CONNECTION------------------------------------------------------>

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });
// <------------------------------------------- CONRTROLLERS ------------------------------------------------------>
// The server now uses MVC architecture, moving the Fruit model interactions from the main server file to a dedicated controller for better code organization
// const Fruit = require("./models/fruit.js");

const charactersCtrl = require("./controllers/characters");

// <------------------------------------------- MIDDLEWARE ------------------------------------------------------>
app.use(express.urlencoded({ extended: false }));
// !! <------------------------------------------- ROUTES ------------------------------------------------------>

// <---------------------------------------------- HOME PAGE ---------------------------->
// #1
app.get("/", charactersCtrl.homePage);

// <---------------------------------------------- ADD NEW CHARACTERPAGE  ---------------------------->
//#2
app.get("/characters/new", charactersCtrl.addNewCharacter);

// <---------------------------------------------- CAPTURE NEW CHARACTER FORM SUBMISSION DATA  ---------------------------->
//#3
app.post("/characters", charactersCtrl.captureNewCharacterData)



// <------------------------------------------- Start Server ------------------------------------------------------>
app.listen(3003, () => {
    console.log('Listening on port 3003, Project-2-IS-A-GO!')
});