const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
const mongoose = require('mongoose');
const Vote = require('../models/vote');
const Question = require('../../pollAPI/models/questions');
const Option = require('../../pollAPI/models/options');
require('dotenv').config();

const pusher = new Pusher({
    appId: "1434734",
    key: "989c731db992728b5b90",
    secret: "2020c3787d29fc9ffc3e",
    cluster: "ap2",
    useTLS: true
});

//this actually means that the route is /poll
router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({
        success: true,
        votes: votes
    }));
});

router.post('/', (req, res) => {

    const newVote = {
        team: req.body.team,
        points: 1
    }

    new Vote(newVote).save().then(vote => {
        pusher.trigger("question-poll", "question-vote", {
            points: parseInt(vote.points),
            team: vote.team
        });

        return res.json({
            success: true,
            message: "Thank you for voting"
        });
    });
});

module.exports = router;



