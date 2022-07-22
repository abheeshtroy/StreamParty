const express = require('express');
const router = express.Router();

const questionsController = require('../../../controllers/questionsController');

//http://localhost:3000/api/v1/questions/create?
router.post('/create', function(req, res) {
    questionsController.createNewQuestion(req, res)
});

router.get('/:id', function(req, res) {
    questionsController.viewQuestion(req, res)
});

router.delete('/:id/delete', function(req, res) {
    questionsController.deleteQuestion(req, res)
});

module.exports = router;