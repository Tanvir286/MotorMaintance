const blankFieldValidation = require("../helpers/blankFieldValidation");
const emailSender = require("../helpers/emailSender");
const emailValidation = require("../helpers/emailValidation");
const textLengthValidation = require("../helpers/textLenghtValidation");
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const RegistrationController = async (req, res) => {
    const { name, email, password } = req.body;

    console.log("Request received:", { name, email, password});

    /*======(Validation Part Start)=========*/
    if (blankFieldValidation(name)) {
        return res.status(400).json({ message: "Name is required" });
    } else if (blankFieldValidation(email)) {
        return res.status(400).json({ message: "Email is required" });
    } else if (blankFieldValidation(password)) {
        return res.status(400).json({ message: "Password is required" });
    } else if (textLengthValidation(name, 5)) {
        return res.status(400).json({ message: "Minimum 5 characters needed for name" });
    } else if (textLengthValidation(password, 8)) {
        return res.status(400).json({ message: "Minimum 8 characters needed for password" });
    } else if (!emailValidation(email)) {
        return res.status(400).json({ message: "Invalid Email" });
    } 
    /*======(Validation Part End)=========*/

    try {
        /*====(Check if email already exists)====*/
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Conflict Error: Email already in use");
            return res.status(409).json({ message: "Email already in use" });
        }

        /*=====(Hash the password)========*/
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password hashed successfully");

        /*====(Save the user data)====*/
        const userData = new User({
            name,
            email,
            password: hashedPassword,
        });
        await userData.save();

        /*===(Generate a JWT token)===*/
        const token = jwt.sign({ email }, "abcd", { expiresIn: '1h' });
        console.log("JWT token generated:", token);

        /*===(Email Verification)===*/
        await emailSender(email, token);
        console.log("Verification email sent to:", email);

        /*=====(User Registration Successful)===*/
        return res.status(200).json({
            message: "Registration successful"
        });

    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Registration failed. Please try again later." });
    }
};

module.exports = RegistrationController;
