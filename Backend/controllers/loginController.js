const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const blankFieldValidation = require("../helpers/blankFieldValidation");
const emailValidation = require("../helpers/emailValidation");



const LoginController = async (req, res) => {
    
    const email = req.body.email.trim();
    const password = req.body.password.trim();
    
    // Validate email and password
    if (blankFieldValidation(email)) {
        return res.status(400).json({ message: "Email is required" });
    } else if (!emailValidation(email)) {
        return res.status(400).json({ message: "Invalid Email" });
    } else if (blankFieldValidation(password)) {
        return res.status(400).json({ message: "Password is required" });
    }


    try {
        /*====(Find the user by email in the database)====*/
        const user = await User.findOne({ email });
        console.log(user); 

        if (user) {
            
            /*====(Check if the user's email is verified)====*/
            if (user.emailVerify) {
                console.log(user.password,password); 
                /*====(Compare the provided password with the stored hashed password)====*/
                bcrypt.compare(password, user.password, (err, result) => {
                 
                    
                    if (result) {
                        
                        /*====(Password match, login successful)====*/
                        return res.json({ 
                                   message: "Login Successful",
                                   name: user.name,
                                   email: user.email,
                                   emailVerified: user.emailVerify
                         }); 
                    } 
                    else {
                        // Password mismatch, invalid credentials
                        return res.json({ message: "Invalid credentials" });
                    }
                });
            } 
            else {
                /*====(Email not verified)====*/
                return res.json({ message: "Please verify your email " });
            }
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

module.exports = LoginController ;
