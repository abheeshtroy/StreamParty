const express = require('express');
const router = express.Router();

const optionsController = require('../../../controllers/optionsController');

router.post('/:id/create', function(req, res) {
    optionsController.createNewOption(req, res)
});

router.get('/:id/addVote', function(req,res) {
    optionsController.addVote(req, res)
});

router.delete('/:id/delete', function(req, res) {
    optionsController.deleteOption(req, res)
});

module.exports = router;