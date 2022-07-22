const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
    team: {
        type: String,
        required: true
    },
    points: {
        type: String,
        required: true
    }
});

//Create collection and add schema
const Vote = mongoose.model('vote', VoteSchema);

module.exports = Vote;

