const nodemailer = require("nodemailer");

const emailSender = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "tanvirdiu200@gmail.com",
            pass: "hftr uagv gsoq sqlc", 
        },
    });

    // Send the email
    const info = await transporter.sendMail({
        from: '"Mern Blog 👻" <tanvirdiu200@gmail.com>',
        to: email,
        subject: "Please verify your email",
        html: `Please verify your email by clicking <a href='http://localhost:5173/emailVerification/${token}'>click here</a>`,
    });

    console.log("Email sent: " + info.response);
};

module.exports = emailSender;
