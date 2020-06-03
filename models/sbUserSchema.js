const mongoose = require('mongoose');

const sbUserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const songbirdUsers = mongoose.model('SongBirdUsers', sbUserSchema);

module.exports =songbirdUsers;