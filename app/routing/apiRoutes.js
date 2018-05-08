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
        var newUser = req.body;
        
        // Compare against one existing user to test
        var totalDifference = 0;
        for (var i = 0; i < friendsData[0].scores.length; i++) {
            totalDifference += Math.abs(newUser.scores[i] - friendsData[0].scores[i]);
        }
        console.log("TOTAL DIFFERENCE: " + totalDifference);
        friendsData.push(newUser);
        res.end();
    });
};