// Citation for the following file:
// Date: 02/26/2025
// Based on: CS 340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

// reactServer.cjs
// Uses common javascript to serve the react build folder (/dist)

// const express = require('express');
// const path = require('path');
// const app = express();
// require("dotenv").config();

// // Use the custom 'REACT_SERVER_PORT' port from .env, with a fallback to 3001
// const PORT = process.env.REACT_SERVER_PORT || 3001;

// // Serve the static files from the React app located in the build folder '/dist'
// // React router will take over frontend routing
// app.use(express.static(path.join(__dirname, 'dist')));

// // Handles any requests that don't match the ones above to return the React app
// // A request to '/nonExist' will redirect to the index.html where react router takes over at '/'
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
// });

// app.listen(PORT, () => {
//   // Change this text to whatever FLIP server you're on
//   console.log(`Server running:  http://classwork.engr.oregonstate.edu:${PORT}...`);
// });