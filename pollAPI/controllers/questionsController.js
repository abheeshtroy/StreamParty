const mongoose = require('mongoose');
const Question = require('../models/questions');
const Option = require('../models/options');

//Function to create a question
module.exports.createNewQuestion = async function(req, res) {
    try{
        let question = await Question.create(req.body);
        if(Question) {
            //return 200 success response if it is created
            return res.status(200).json({
                question,
                data: {message: "New Question created successfully"},
            });
            
        }
        else {
            //else return sattus 500 error response
            return res.status(500).json({
                data: {message: "Internal Server Error"}
            });
        }
    }
    catch(err) {
        console.log("Error in creating question", err);
        //else return sattus 500 error response
        return res.status(500).json({
            data: {message: "Internal Server Error in creating a question"}
        });
    }
}

//function to view the questions
module.exports.viewQuestion = async function(req, res) {
    try {
        let question = await Question.findById(req.params.id).populate('options');
        return res.status(200).json({question});
    }
    catch(err) {
        console.log('Error in viewing question', err);
        return res.status(500).json({
            data : {message: "Internal server error in viewing question"} 
        });
    }
}

module.exports.deleteQuestion = async function(req, res) {
    try{
        let id = req.params.id;
        let question = await Question.findById(id).populate({
            path: 'options',
            select: 'votes'
        });
        
        if(question) {
            //checking if any option has some votes already
            let options = question.options;

            for(let i=0; i<options.length; i++) {
                if(options[i].votes > 0) {
                    return res.status(404).json({
                        data: {
                            message: "Question cannot be deleted, its options are voted already"
                        }
                    });
                }
            }

            await Option.deleteMany({question: id});
            await Question.findByIdAndDelete(id);

            return res.status(200).json({
                message: "Question deleted successfully"
            });
        }
        else {
            return res.status(404).json({message: "Question not found"});
        }
    }
    catch(err) {
        console.log('Error in deleting question', err);

        return res.status(500).json({
            message: "Internal server error in deleting question"
        });
    }
}

