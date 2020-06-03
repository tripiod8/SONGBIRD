const mongoose = require('mongoose');

const sbInfoSchema = mongoose.Schema({
    song: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    }
});

const songbirdInfo = mongoose.model('SongBirdInfo', sbInfoSchema);

module.exports =songbirdInfo;