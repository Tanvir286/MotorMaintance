const Admin = require("../models/adminModel");
const bcrypt = require('bcrypt');
const blankFieldValidation = require("../helpers/blankFieldValidation");
const emailValidation = require("../helpers/emailValidation");


const adminController = async (req, res) => {
    
    const email = req.body.email.trim();
    const password = req.body.password.trim();

    // Validate email and password
    if (blankFieldValidation(email)) {
        return res.json({ message: "Email is required" });
    } else if (!emailValidation(email)) {
        return res.json({ message: "Invalid Email" });
    } else if (blankFieldValidation(password)) {
        return res.json({ message: "Password is required" });
    }

    try {
        /*====(Find the user by email in the database)====*/
        const user = await Admin.findOne({ email });
        console.log(user); 

        if (user) {
            
                /*====(Compare the provided password with the stored hashed password)====*/
                bcrypt.compare(password, user.password, (err, result) => {
                    
                    
                    if (result) {
                        
                        /*====(Password match, login successful)====*/
                        return res.json({ 
                                   message: "Admin Successful Login",
                         }); 
                    } 
                    else {
                        // Password mismatch, invalid credentials
                        return res.json({ message: "Invalid credentials" });
                    }
                });
             
            
        } 
        else {
            /*====(User not found in the database)====*/
            return res.json({ message: "User not found" });
        }
    } catch (error) {
        /*====(Handle any errors that occur during the login process)====*/
       return res.json({ message: "Login failed" });
    }
};

module.exports = adminController;
