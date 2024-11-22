const Comic = require('../models/character')

// <------------------------------------------- HOME PAGE/GET ROUTE------------------------------------------------------>
// #1
// HTTP GET - renders the home page as set up by 'home.ejs', endpoint: '/'
const homePage = async (req, res) => {
    res.render('home.ejs')
};

// <------------------------------------------- REQUEST A NEW CHARACTER/ GET ROUTE------------------------------------------------------>
// #2
// HTTP GET - renders the 'add a character page' as set up by 'new.ejs', endpoint: '/characters/new'
const addNewCharacter = async (req, res) => {
    res.render("characters/new.ejs")
};

// <------------------------------------------- /------------------------------------------------------>
// #3
// HTTP POST - This route captures the data submitted by the form deployed by the 'new.ejs' page
const captureNewCharacterData = async (req, res) => {
    console.log(req.body)
    res.redirect('/characters/new')
};
// <--------------------------------------------EXPORTS ------------------------------------------------------>

module.exports = {
    homePage,
    addNewCharacter,
    captureNewCharacterData,
}