const mongoose = require('mongoose');

const sbTagSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    }
});

const songbirdTag = mongoose.model('SongBirdTag', sbTagSchema);

module.exports =songbirdTag;