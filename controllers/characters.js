// <------------------------------------------- MODEL IMPORT --------------------------------------->
const Character  = require('../models/character');


// <------------------------------------------- HOME PAGE/ GET ROUTE-------------------------------->
// #1
// HTTP GET - renders the home page as set up by 'home.ejs', endpoint: '/'
const homePage = async (req, res) => {
    res.render('home.ejs');
};

// <------------------------------------------- ADD NEW CHARACTER PAGE/ GET ROUTE-------------------->
// #2
// HTTP GET - renders the 'add a character page' as set up by 'new.ejs', endpoint: '/characters/new'
const addNewCharacter = async (req, res) => {
    res.render("characters/new.ejs");
};

// <-----------CAPTURE NEW CHARACTER DATA/FORM SUBMISSION/ POST ROUTE/ CREATE FUNCTIONALITY ---------------------------------->
// #3
// HTTP POST  - This route captures the data submitted by the form deployed by the 'new.ejs' page, endpoint: '/characters' - as designated by form on 'new.ejs'
const captureNewCharacterData = async (req, res) => {
    if (req.body.galleryAvailable === "on") {
        req.body.galleryAvailable = true;
    } else {
        req.body.galleryAvailable = false;
    }
    await Character.create(req.body);
    res.redirect('characters')
};
// <------------------------------------------- INDEX PAGE/ GET ROUTE---------------------------------->
// #4
// HTTP GET - Renderes the 'index.ejs' page
const indexPage = async (req, res) => {
    const allCharacters = await Character.find();
    // console.log(allCharacters); // log the characters!
    res.render("characters/index.ejs", {characters: allCharacters});
};

// <----------------------------------------------SEARCH PAGE/ GET ROUTE------------------------------------>
//#5
// HTTP GET - renders the 'search.ejs' page, endpoint: '/characters/search'
const searchPage = async (req, res) => {
    res.render("characters/search.ejs")
}

// <----------------------------------------------SEARCH RESULTS/ GET ROUTE --------------------------->
//#6
const searchResults = async (req, res) => {
    res.render("characters/results.ejs")
}


// <----------------------------------------------SHOW PAGE/ GET ROUTE/ READ FUNCTIONALITY-------------->
//#7
// HTTP GET - Renders the 'show.ejs' page based on '_id'
const showPageById = async (req, res) => {
    const foundCharacter = await Character.findById(req.params.characterId);
    res.render("characters/show.ejs", {character: foundCharacter});
};

// <-------------------------------------DELETE A CHARACTER/ DELETE ROUTE/ DELETE FUNCTIONALITY---------->
//#8
const deleteACharacter = async (req, res) => {
    await Character.findByIdAndDelete(req.params.characterId);
    res.redirect("/characters");
};

// <----------------------------------------------EDIT A CHARACTER/ EDIT ROUTE---------------------------->
//#9

const editACharacter = async (req, res) => {
    const foundCharacter = await Character.findById(req.params.characterId);
    // console.log(foundCharacter)
    res.render("characters/edit.ejs", {character: foundCharacter});
}

// <----------------------------------------------UPDATE A CHARACTER/ UPDATE ROUTE------------------------->
//#10

const updateACharacter = async (req, res) => {
    // Handle the 'galleryAvailable' checkbox data
    if(req.body.galleryAvailable === "on") {
        req.body.galleryAvailable = true;
    } else {
        req.body.galleryAvailable = false
    }

    // Update the character in the database
    await Character.findByIdAndUpdate(req.params.characterId, req.body);

    // Redirect to the Character's show page to see the updates
    res.redirect(`/characters/${req.params.characterId}`)
}



// <--------------------------------------------EXPORTS ------------------------------------------------------>

module.exports = {
    homePage,
    addNewCharacter,
    captureNewCharacterData,
    indexPage,
    showPageById,
    deleteACharacter,
    editACharacter,
    updateACharacter,
    searchPage,
    searchResults
}