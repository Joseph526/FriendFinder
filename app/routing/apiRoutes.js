// Load data from JS object
var friendsData = require("../data/friends.js");

// Declare and export routes
module.exports = function(app) {
    
    // GET route to display all friends
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    // POST route to update friends
    app.post("/api/friends", function(req, res) {
        friendsData.push(req.body);
        res.end();
    });
};