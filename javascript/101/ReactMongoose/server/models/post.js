const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    author: String,
    content: String,
    comments: [{ content: String, date: { type: Date, default: Date.now }, author: String }],
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);