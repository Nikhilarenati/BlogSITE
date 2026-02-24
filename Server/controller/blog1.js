const Blog = require("../models/blog"); 
const User = require("../models/User");
const mongoose = require('mongoose'); 

const createBlog = async (req, res) => {
    const { title, description, author, selectedFile, tags } = req.body;

    try {
        

        const newBlog = new Blog({
            title,
            description,
            author, 
            selectedFile,
            tags
        });

        const savedBlog = await newBlog.save();
        
        
        return res.status(201).json({ msg: "Success", blog: savedBlog });

    } catch (err) {
        console.error("Backend Create Error:", err.message);
        
        return res.status(500).json({ msg: "Database Error", error: err.message });
    }
}

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}); 
        return res.json({ blogs });
    }
    catch (err) {
        res.status(500).json({ msg: "something went wrong" });
    }
}

const getBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        const blogData = await Blog.findById(id); 
        if (!blogData) return res.status(404).json({ msg: "blog not found" });
        return res.json({ blog: blogData });
    }
    catch (err) {
        return res.status(500).json({ msg: "something went wrong" });
    }
}

const getBlogBySearch = async (req, res) => {
    
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        
        const tagsArray = tags.split(',');

        const blogs = await Blog.find({
            $or: [
                { title },
                { tags: { $in: tagsArray } } 
            ]
        });

        res.status(200).json({ data: blogs });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}
const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, description, selectedFiles, tags } = req.body;
    try {
        
        const updatedBlog = await Blog.findByIdAndUpdate(id, { title, description, selectedFiles, tags }, { new: true });
        return res.json({ updatedBlog });
    }
    catch (err) {
        return res.status(500).json({ msg: "something went wrong" });
    }
}

const deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: `No blog found with id: ${id}` });
        }

        
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ msg: "Blog not found in database" });
        }

        res.status(200).json({ msg: "Blog deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error); 
        res.status(500).json({ msg: "Server error during deletion", error: error.message });
    }
}

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogBySearch,
    getBlogById,
    updateBlog,
    deleteBlog
};