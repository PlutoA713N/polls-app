const express = require('express');
const Poll = require('../models/Poll');

const router = express.Router();

router.post('/:pollId', (req, res) => {
    const { pollId } = req.params;
    const { selectedOption } = req.body;

    Poll.findById(pollId)
        .then((poll) => {
            if (!poll) {
                return res.status(404).json({ message: 'Poll not found' });
            }

        const optionIndex = poll.options.findIndex(
            (options) => optionIndex.optionText == selectedOption
        );

        poll.options[optionIndex].votes++;
        return poll.save();
    })
    .then((updatedPoll) => {
        res.status(200).json(updatedPoll);
    })
    .catch((error)=> {
       console.error('Error voting:', error);
       res.status(500).json({ message: 'Internal server error' })
    });

});

module.exports = router;