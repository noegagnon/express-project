const model = require('../models/friends.model');

function getFriends(req, res) {
    res.json(model);
}

function postFriend(req, res) {
    // validate data
    if (!req.body.name) {
        return res.status(400).json({
            error: 'Missing friend name'
        });
    }
    const newFriend = {
        name: req.body.name,  // req.body don't exist unless we parse the json using the middleware.
        id: model.length
    }
    model.push(newFriend);
    res.json(newFriend)
}

function getFriend(req, res) {
    const friendId = Number(req.params.friendId);  // convert string from endpoint to number

    // validate value, if not in friend array, it'll be undefined
    const friend = model[friendId]
    if (friend) {
        res.json(friend);
    } else {
        res.status(404).json({
            error: "Friend doesn't exist"
        }) // always good to send json
    }
}

module.exports = {
    getFriends,
    getFriend,
    postFriend
}