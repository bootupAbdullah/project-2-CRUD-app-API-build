// <------------------------------------------- MODEL IMPORT --------------------------------------->
const Character  = require('../models/character');
const crypto = require('crypto')
const axios = require('axios')


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
// HTTP GET - Renderes the 'index.ejs' page, endpoint: '/characters' - same as above - first the post route was created and then get - post, after posting form, redirects to GET route for matching page
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

// <----------------------------------------------SEARCH PAGE/ POST ROUTE------------------------------------>
//#6
// HTTP POST
const displaySearchData = async (req, res) => {
    // !! Express having issues with converting "userInput" into primitave value, found suggestion on Stack Overflow:
    // let userInput = object.create(null);
    // Capture user input
    let userInput = req.body["query"]
    console.log(userInput)
    
    // Testing/creating 'time stamp' requirement
    // console.log(new Date().getTime())
    let ts = new Date().getTime()
    
    //!! Declare variables for API keys
    let apiKey = process.env.MARVEL_PUBLIC_API_KEY
    let privateApiKey = process.env.MARVEL_PRIVATE_API_KEY
    // console.log(apiKey, privateApiKey)
    
    // Creating variable for 'base' URL for easier user/input
    // let searchByCharacterUrl = "http://gateway.marvel.com/v1/public/characters?" //!! not in use
    // console.log(searchByCharacterUrl)
    
    // console.log(searchByCharacterUrl + ts=ts + '& + apiKey + '&')
    // console.log(`${searchByCharacterUrl}ts=${ts}&apikey=${apiKey}&hash`)
    
    //!! Following attempt did not work, creating an array with parameters to use in '.update' method
    // let varsToHash = [ts, apiKey, privateApiKey]
    // console.log(varsToHash)
    
    // Create a 'hash' value using (3) URL requirements
    
    let hash = crypto.createHash('md5').update(`${ts}${privateApiKey}${apiKey}`).digest("hex")
    console.log(hash)
    
    //!! API call with set parameters
    try{
        const dataFromApi = await axios.get(`http://gateway.marvel.com/v1/public/characters?name=${userInput}&ts=${ts}&apikey=${apiKey}&hash=${hash}`);
        // const seriesData = await axios.get(`http://gateway.marvel.com/v1/public/characters/1009262/series&ts=${ts}&apikey=${apiKey}&hash=${hash}`);
        // const seriesTest = seriesData.data;
        const data = dataFromApi.data;
        // console.log(seriesTest)
        console.log(data.data);
        console.log(data.data.results);
        console.log(data.data.results[0]);
        console.log(data.data.results[0].comics)
        //!! Trial and error: 
        // console.log(dataFromApi)
        // console.log(dataFromApi.data.data)
        // console.log(dataFromApi.data.data[comics])
        // console.log('data: ' + dataFromApi.data)
        // console.log()

        // console.log(dataFromApi.data)
        // console.log("dataFromApi.data.data:")
        // console.log(dataFromApi.data.data)
        // console.log()
        // console.log("dataFromApi.data.data.results")
        // !! This following call will list all comics and images for character inside of an object in key:value pairs (20 per call)
        // console.log(dataFromApi.data.data.results[0].comics)
        // console.log( '.data.data: ' + dataFromApi.data.data)
        // console.log(dataFromApi.data.data.results[0])
        // !! 
        // console.log(dataFromApi.data)
        // console.log(dataFromApi.data.data.results)
        // console.log(dataFromApi.data.data.results[0].comics.items)
        //!! Working here:
        let characterComicsImages = dataFromApi.data.data.results[0].comics.items[0].resourceURI
        console.log(characterComicsImages)
        let selectAPIData = dataFromApi.data.data.results
        res.render("characters/results.ejs", {characterData: selectAPIData})
        //!! End here
    } catch (error) {
        console.error("There was an error: ", error)
    }
    
    // res.redirect("search")
}

// // <----------------------------------------------SEARCH RESULTS/ GET ROUTE --------------------------->
// //#6
// const searchResults = async (req, res) => {
//     res.render("characters/results.ejs")
// }


// <----------------------------------------------SHOW PAGE/ GET ROUTE/ READ FUNCTIONALITY-------------->
//#7
// HTTP GET - Renders the 'show.ejs' page based on '_id'
const showPageById = async (req, res) => {
    const foundCharacter = await Character.findById(req.params.characterId);
    res.render("characters/show.ejs", {character: foundCharacter});
};

// <-------------------------------------DELETE A CHARACTER/ DELETE ROUTE/ DELETE FUNCTIONALITY---------->
//#8
// HTTP DELETE - functionality for deleting a character
const deleteACharacter = async (req, res) => {
    await Character.findByIdAndDelete(req.params.characterId);
    res.redirect("/characters");
};

// <----------------------------------------------EDIT A CHARACTER/ EDIT ROUTE---------------------------->
//#9
// !! resolve comment HTTP 
const editACharacter = async (req, res) => {
    const foundCharacter = await Character.findById(req.params.characterId);
    // console.log(foundCharacter)
    res.render("characters/edit.ejs", {character: foundCharacter});
}

// <----------------------------------------------UPDATE A CHARACTER/ UPDATE ROUTE------------------------->
//#10
//!! resolve comment
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
    displaySearchData,
    // searchResults
}