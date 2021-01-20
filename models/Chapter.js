const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ChapterSchema = new Schema({
    chapter: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    manga: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Manga'
    },
    group: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'TranslatorGroup'
    },
    translator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    view: {
        type: Number,
        required: true,
        default: 0
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    content: [{
        type: String
    }]
});

module.exports = mongoose.model('Chapter', ChapterSchema);