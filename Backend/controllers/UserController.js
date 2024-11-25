const blogModel = require("../models/blogModel");
const titleModal = require("../models/titleModal");


/*===================================>
  // TODO:  create title start
======================================*/
  const createTitle = async (req, res) => {
 
    const {title} = req.body

    try {
        
        const createTitle = new titleModal({
            title
        })
       await createTitle.save() // save db
       res.status(201).json({ message: "title created successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
/*===================================>
  // TODO:  create title end 
======================================*/

/*=====================================>
  // TODO:  get title  start
========================================*/

 const getTitle = async (req, res) => {

    let data = await titleModal.find({})
    res.send(data)
 }

/*=====================================>
  // TODO:  create  fetch end
========================================*/


/*=====================================>
  // TODO:  delete title  start
========================================*/
const getTitleDelete = async (req, res) => {
    const { title } = req.params;

    try {
        // Correctly pass a query object with the title field to findOneAndDelete
        const deletedBlog = await titleModal.findOneAndDelete({ title });

        if (deletedBlog) {
            res.status(200).send({ message: "Blog deleted successfully", deletedBlog });
        } else {
            res.status(404).json({ message: "Blog not found with the given title" });
        }
    } 
    catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

/*=====================================>
  // TODO:  delete title  end
========================================*/



/*===================================>
  // TODO: Update Description Start
======================================*/

const getUpdateDescription = async (req, res) => {
    const { des } = req.params;  
    const { description } = req.body;  

    try {
        // Find a teacher by their email
        const user = await blogModel.findOne({ description: des });
        
        if (!user) {
            return res.status(404).json({ message: " not found" });
        }
        // Update the name of the found user
        user.description = description;
        // Save the updated user data
        await user.save();
        // Return the updated user
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

/*===================================>
  // TODO: Update Description End
======================================*/


/*====================================>
  // TODO: Update Image Start
======================================*/

const updateBlogPost = async (req, res) => {
    const { ima } = req.params; 
    

    try {

        // Find a blog post by the current description
        const blogPost = await blogModel.findOne({ description: ima });

        if (!blogPost) {
            return res.status(404).json({ message: "Blog post not found." });
        }

        // Optionally update images if provided
        if (images && Array.isArray(images)) {
            blogPost.images = images; // Assuming the `images` field is an array in the model
        }

        // Save the updated blog post
        await blogPost.save();

        // Respond with the updated blog post
        res.status(200).json(blogPost);
    } catch (error) {
        console.error("Error updating blog post:", error);
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};

/*====================================>
  // TODO: Update Image End
======================================*/


/*==================================================>
  // TODO: Update Status  descritpion  Image Start
=====================================================*/

const getUpdateStatus = async (req, res) => {
    const { title } = req.params; // Extract `title` from URL parameters
    const { status, description,images } = req.body; // Extract `status` and `description` from request body

    try {
        // Find the blog/document by its title
        const user = await blogModel.findOne({ title });

        if (!user) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Update the status and description fields
        if (status) user.status = status;
        if (description) user.description = description;

        // Save the updated document
        await user.save();

        // Respond with the updated document
        res.status(200).json({
            message: "Blog updated successfully",
            updatedData: user,
        });
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

/*==================================================>
  // TODO: Update Status  descritpion  Image End
=====================================================*/

/*==================================================>
  // TODO: Update Admin Comment Start
=====================================================*/

const getUpdateComment = async (req, res) => {
    const { title } = req.params; 
    const { comment } = req.body; 

    try {
        // Find the blog/document by its title
        const user = await blogModel.findOne({ title });

        if (!user) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Update the status and description fields
        if (comment) user.comment = comment;
       

        // Save the updated document
        await user.save();

        // Respond with the updated document
        res.status(200).json({
            message: "Blog updated successfully",
            updatedData: user,
        });
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

/*==================================================>
  // TODO: Update Admin Comment End
=====================================================*/



/*==================================================>
  // TODO: Delete Blog Part Start
=====================================================*/

const getDelete = async (req, res) => {
    const { title } = req.params;

    try {
        // Correctly pass a query object with the title field to findOneAndDelete
        const deletedBlog = await blogModel.findOneAndDelete({ title });

        if (deletedBlog) {
            res.status(200).send({ message: "Blog deleted successfully", deletedBlog });
        } else {
            res.status(404).json({ message: "Blog not found with the given title" });
        }
    } 
    catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


/*==================================================>
  // TODO: Delete Blog Part End
=====================================================*/



module.exports = {
    getUpdateDescription,  
    updateBlogPost,
    getUpdateStatus,
    getUpdateComment,
    getDelete,
    createTitle,
    getTitle,
    getTitleDelete,
    
}