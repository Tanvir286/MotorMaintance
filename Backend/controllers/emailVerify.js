const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const emailVerify = async (req, res) => {
    try {
        // Retrieve the token from the URL parameters
        const token = req.params.token;

        // Verify the token using the secret key 'abcd'
        jwt.verify(token, 'abcd', async (err, decoded) => {

            if (err) {
                // Handle errors, like an invalid or expired token
                return res.json({ error: 'Invalid or expired token' });
            } 

            // Log the decoded token information
            console.log(decoded.email); 

            // Find the user by email
            let findUser = await User.findOne({ email: decoded.email });
            console.log(findUser,"ami")
            

            if (!findUser) {
                return res.json({ error: 'User not found' });
            }

            // Check if the email is already verified
            if (findUser.emailVerify) {
                return res.json({ message: 'Email is already verified' });
            }

            // Update the user's email verification status
            findUser.emailVerify = true;
            await findUser.save();


            // Respond with a success message
            return res.json({ message: 'Email successfully verified ', decoded });
        });
    } catch (error) {
        // Handle unexpected errors
        return res.json({ error: 'Internal Server Error' });
    }
}; 

module.exports = emailVerify;
