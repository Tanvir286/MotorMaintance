const Blog = require('../models/blogModel');

const createBlogController = async (req, res) => {
    try {
        const { title, description,status,comment} = req.body;

        // Check if files are uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No images uploaded!" });
        }

        // Create blog with images
        const createBlog = new Blog({
            title,
            description,       
            images: req.files.map(file => file.path), 
            status,
            comment
        });

        await createBlog.save(); // Save to database
        res.status(201).json({ message: "Blog created successfully!" });
    } catch (error) {
        console.error("Error in createBlogController:", error);
        res.status(500).json({ error: "An error occurred while creating the blog." });
    }
};

module.exports = createBlogController;
