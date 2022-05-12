// Import express
const express = require("express");

// Initialize express
const app = express();

// serve static build files from the 'dist' directory
app.use(express.static("./dist/booky"));

// Route incoming server requests to the correct files
app.get("/*", (rex, res) => res.sendFile("index.html", { root: "dist/booky" }));

// Start the app on the default heroku port
app.listen(process.env.PORT || 8080);
