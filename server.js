// <------------------------------------------- IMPORT AND CONFIGURATION -------------------------->
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require('express')
const mongoose = require("mongoose"); // require package
const methodOverride = require('method-override');
const app = express();

// <------------------------------------------- DATABASE CONNECTION------------------------------->

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });
// <------------------------------------------- CONRTROLLERS ------------------------------------->
// The server now uses MVC architecture, moving the Fruit model interactions from the main server file to a dedicated controller for better code organization
// const Fruit = require("./models/fruit.js");

const charactersCtrl = require("./controllers/characters");

// <------------------------------------------- MIDDLEWARE --------------------------------------->
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// !! <-------------------------------------------------------------------- ROUTES ----------------------------------->


// <---------------------------------------------- HOME PAGE/ GET ROUTE --------------------------->
// #1
app.get("/", charactersCtrl.homePage);

// <----------------------------------------------INDEX PAGE/ GET ROUTE---------------------------->
//#4
// app.get("/characters", charactersCtrl.indexPage);

// <---------------------------------------------- ADD NEW CHARACTER PAGE/ GET ROUTE  ------------->
//#2
app.get("/characters/new", charactersCtrl.addNewCharacter);

// <---------------------------------------------- CAPTURE NEW CHARACTER DATA/FORM SUBMISSION/ POST ROUTE/ CREATE FUNCTIONALITY------------>
//#3
app.post("/characters", charactersCtrl.captureNewCharacterData);

// <----------------------------------------------INDEX PAGE/ GET ROUTE---------------------------->
//#4
app.get("/characters", charactersCtrl.indexPage);


// <---------------------------------------------- SEARCH PAGE/ GET ROUTE --------------------------->
//#5
app.get("/characters/search", charactersCtrl.searchPage);

// <---------------------------------------------- SEARCH PAGE/ GET ROUTE --------------------------->
//#6
app.post("/characters/search", charactersCtrl.captureSearchData);



// // <----------------------------------------------SEARCH RESULTS/ GET ROUTE --------------------------->
// // #
// app.get("/characters/search/results", charactersCtrl.searchResults);

// <----------------------------------------------SHOW PAGE/ GET ROUTE/ READ FUNCTIONALITY--------->
//#
app.get("/characters/:characterId", charactersCtrl.showPageById);

// <----------------------------------------------DELETE FUNCTIONALITY------------------------------>
//#
app.delete("/characters/:characterId", charactersCtrl.deleteACharacter);

// <----------------------------------------------EDIT PAGE/ GET ROUTE ------------------------------------>
//#
app.get("/characters/:characterId/edit", charactersCtrl.editACharacter);


// <----------------------------------------------UPDATE A CHARACTER/ PUT ROUTE------------------------------------>
//#1
app.put("/characters/:characterId", charactersCtrl.updateACharacter);


// <------------------------------------------- Start Server --------------------------------------->
app.listen(3003, () => {
    console.log('Listening on port 3003, Project-2-IS-A-GO!')
});