// backend/routes/forms.js

const Form = require('../models/form');


// Create a form

const CreateForm = async (req,res) => {

    try {
        const form = new Form(req.body);
        await form.save();
        res.status(201).json(form);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}    



// router.post('/', async (req, res) => {
  
// });


// Get all forms

const GetForm = async (req,res) => {

    try {
        const forms = await Form.find();
        res.json(forms);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}    




// Update a form

const UpdateForm = async (req,res) => {

    try {
        const updatedForm = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedForm);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}    


// Delete a form


const DeleteForm = async (req,res) => {

    try {
        await Form.findByIdAndDelete(req.params.id);
        res.json({ message: 'Form deleted successfully!' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}    



module.exports = {
    CreateForm,
    GetForm,
    UpdateForm,
    DeleteForm,
};
