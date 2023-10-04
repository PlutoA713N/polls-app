const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
question: {type: String, required: true},
options: [{
    optionsText: {
        type: String,
        required: true,
    },
    votes: {
        type: Number,
        default: 0,
    },
}],
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;