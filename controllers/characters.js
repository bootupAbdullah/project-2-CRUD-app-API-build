const Comic = require('../models/character')

// <------------------------------------------- HOME PAGE/GET ROUTE------------------------------------------------------>

const homePage = async (req, res) => {
    res.render('home.ejs')
}

// <------------------------------------------- REQUEST A NEW CHARACTER/ GET ROUTE------------------------------------------------------>
const newCharacterRequest = async (req, res) => {
    res.render("characters/new.ejs")
}



// <--------------------------------------------EXPORTS ------------------------------------------------------>

module.exports = {
    homePage,
    newCharacterRequest,
}