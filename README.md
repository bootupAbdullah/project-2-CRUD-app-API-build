# Consume the Marvel API

A web application that allows users to manage Marvel characters and search the Marvel API for character information.

## Overview

This application provides a platform to:
1. Create, read, update, and delete (CRUD) custom Marvel character entries
2. Search the official Marvel API for character data
3. View detailed information about Marvel characters

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templates
- **API Integration**: Marvel API with Axios for HTTP requests
- **Authentication**: Crypto for MD5 hash generation
- **Environment Variables**: Dotenv for configuration

## Prerequisites

- Node.js (v12 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Marvel Developer Account (for API keys)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd marvel-characters-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=<your-mongodb-connection-string>
   MARVEL_PUBLIC_API_KEY=<your-marvel-public-api-key>
   MARVEL_PRIVATE_API_KEY=<your-marvel-private-api-key>
   ```

4. Start the application:
   ```
   npm start
   ```

5. Access the application at `http://localhost:3003`

## Project Structure

- **server.js**: Main entry point that sets up Express server and routes
- **controllers/characters.js**: Controller handling character-related logic
- **models/character.js**: Mongoose schema for character data
- **views/**: EJS templates for rendering web pages
  - **home.ejs**: Landing page
  - **characters/**: Character-related pages
    - **new.ejs**: Form to add a new character
    - **index.ejs**: List of all characters
    - **show.ejs**: Detailed view of a character
    - **edit.ejs**: Form to edit a character
    - **search.ejs**: Search form for Marvel API
    - **results.ejs**: Display search results

## Features

### Character Management

- **Create**: Add new Marvel characters to your collection
- **Read**: View all characters or get details about a specific character
- **Update**: Edit character information
- **Delete**: Remove characters from your collection

### Marvel API Integration

- Search the official Marvel API for character data
- View details about official Marvel characters
- Access to comics, series, and other related information

## Routes

| Method | Route                         | Function                      | Description                               |
|--------|-------------------------------|-------------------------------|-------------------------------------------|
| GET    | /                             | homePage                      | Renders the home page                     |
| GET    | /characters/new               | addNewCharacter               | Renders form to add a new character       |
| POST   | /characters                   | captureNewCharacterData       | Creates a new character                   |
| GET    | /characters                   | indexPage                     | Lists all characters                      |
| GET    | /characters/search            | searchPage                    | Renders the search form                   |
| POST   | /characters/search/results    | displaySearchData             | Processes search and shows results        |
| GET    | /characters/:characterId      | showPageById                  | Shows details for a specific character    |
| DELETE | /characters/:characterId      | deleteACharacter              | Deletes a character                       |
| GET    | /characters/:characterId/edit | editACharacter                | Renders form to edit a character          |
| PUT    | /characters/:characterId      | updateACharacter              | Updates a character                       |

## Marvel API Integration

The application integrates with the Marvel API to fetch official character data. The integration requires:

1. Timestamp generation
2. MD5 hash creation using timestamp, private key, and public key
3. API calls with appropriate authentication parameters

## Development Notes

- The application runs on port 3003 by default
- MongoDB connection status is logged to the console on startup
- The `galleryAvailable` property is stored as a boolean in the database

## Resources

### Development Resources

- **Timestamp functionality**: 
  https://stackoverflow.com/questions/221294/how-do-i-get-a-timestamp-in-javascript

- **Initializing MD5 in JavaScript**:
  https://gist.github.com/kitek/1579117

- **Hash functionality**: 
  https://nodejs.org/api/crypto.html#hashdigestencoding

- **Marvel API call**:
  https://stackoverflow.com/questions/55549492/how-to-send-timestamp-and-md5-hash-for-marvel-api-request

- **Using img src in EJS file**:
  https://stackoverflow.com/questions/29442991/how-to-display-an-image-tag-with-the-ejs-template-engine-for-node-js

- **Google sign-in button guidelines**:
  https://developers.google.com/identity/branding-guidelines

- **Gradient colors**:
  https://www.w3schools.com/colors/tryit.asp?filename=trycolors_gradient

ChatGPT was also used to work through problems and understand concepts better.