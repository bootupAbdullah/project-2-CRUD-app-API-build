const Character  = require('../models/character')

// <------------------------------------------- HOME PAGE/ GET ROUTE------------------------------------------------------>
// #1
// HTTP GET - renders the home page as set up by 'home.ejs', endpoint: '/'
const homePage = async (req, res) => {
    res.render('home.ejs')
};

// <------------------------------------------- ADD NEW CHARACTER PAGE/ GET ROUTE------------------------------------------------------>
// #2
// HTTP GET - renders the 'add a character page' as set up by 'new.ejs', endpoint: '/characters/new'
const addNewCharacter = async (req, res) => {
    res.render("characters/new.ejs")
};

// <-------------------------------------------CAPTURE NEW CHARACTER DATA/FORM SUBMISSION/ POST ROUTE ------------------------------------------------------>
// #3
// HTTP POST  - This route captures the data submitted by the form deployed by the 'new.ejs' page, endpoint: '/characters' - as designated by form on 'new.ejs'
const captureNewCharacterData = async (req, res) => {
    if (req.body.galleryAvailable === "on") {
        req.body.galleryAvailable = true
    } else {
        req.body.galleryAvailable = false;
    }
    await Character.create(req.body);
    res.redirect('characters/new')
};
// <------------------------------------------- INDEX PAGE/ GET ROUTE------------------------------------------------------>
// #4
// HTTP GET - Renderes the 'index.ejs' page
const indexPage = async (req, res) => {
    res.send("Welcome to the index page!")
}

// <--------------------------------------------EXPORTS ------------------------------------------------------>

module.exports = {
    homePage,
    addNewCharacter,
    captureNewCharacterData,
    indexPage,
}