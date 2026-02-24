const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
    },

    selectedFile: String,
    tags: {
        type: [String], 
    }
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;