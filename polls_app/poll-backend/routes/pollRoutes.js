const express = require('express');
const {body, validationResult} = require('express-validator');
const Poll = require('../models/Poll');

const router = express.Router();

router.post('/', 
    [
        body('question').notEmpty().withMessage('Question is required.'),
        body('options')
            .isArray({min: 2})
            .withMessage('At least two options are required'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if( !errors.isEmpty() ){
            return res.status(400).json({ errors: errors.array() })
        }

        const { question, options } = req.body;
        const newPoll = new Poll({ question, options});

        newPoll
            .save()
            .then((savedPoll) => {
                res.status(200).json(savedPoll);
            })
            .catch((error) => {
                res.status(500).json({message: 'Internal server error'})
            });

    }
);

router.get('/', (req, res) => { 
    Poll.find({})
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            console.error('Error fetching polls', error);
            res.status(500).json({ message: 'Internal server error' })
        });
});

module.exports = router;