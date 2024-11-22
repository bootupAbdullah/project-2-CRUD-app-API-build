// <------------------------------------------- Imports and Configuration ------------------------------------------------------>
const mongoose = require("mongoose");
// <------------------------------------------- Schemas ------------------------------------------------------>
const characterSchema = new mongoose.Schema({
    name: String,
    galleryAvailable: Boolean,
  });
// <------------------------------------------- Model ------------------------------------------------------>
  const Character = mongoose.model("Character", characterSchema); // create model
  // <------------------------------------------- Export ------------------------------------------------------>
  module.exports = Character;