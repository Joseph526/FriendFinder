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
        var friendMatch = {
            name: "",
            photo: ""
        };

        // Loop through all existing friends, only keep track if new scoreToBeat is lower
        // Initialize scoreToBeat as arbitrary high number
        var scoreToBeat = 999;
        for (var j = 0; j < friendsData.length; j++) {
            newFriendScore = friendChecker(newUser, friendsData[j]);
            if (newFriendScore < scoreToBeat) {
                scoreToBeat = newFriendScore;
                friendMatch = {
                    name: friendsData[j].name,
                    photo: friendsData[j].photo
                };
            }
        }
        friendsData.push(newUser);
        
        // Return JSON of friend match
        res.json(friendMatch);
    });
};

// Declare function to check against one friend at a time
function friendChecker(newUser, friendToCheck) {
    var totalDifference = 0;
    for (var i = 0; i < friendToCheck.scores.length; i++) {
        totalDifference += Math.abs(newUser.scores[i] - friendToCheck.scores[i]);
    }
    return totalDifference;
}