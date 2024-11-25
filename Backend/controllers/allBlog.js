
const blogModel = require('../models/blogModel');

const allBlog = async (req, res) =>{
    let data = await blogModel.find({})
    res.send(data)
}

module.exports = allBlog;