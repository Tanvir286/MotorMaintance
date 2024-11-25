// const userRouter = require('./routes/user.route');

const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.route");
require("./config/db");
const app = express();


// Global CORS Middleware - Allow all origins (for testing)
app.use(cors());
// Middleware to parse incoming JSON request bodies
app.use(express.urlencoded({ extended: true }));
// upload files
app.use('/uploads' ,express.static('uploads')); 
// json data Support
app.use(express.json());



// Define the '/user' route using the imported userRouter
app.use("/user", userRouter);

/*===============================>
   // TODO: DEAFULT ROUTES 
=================================*/
app.get("/", (req, res) => {
    res.status(400).send("Request successful!");
});
  
/*===============================>
   // TODO: ROUTES NOT FOUND
=================================*/
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});
/*===============================>
    // TODO: SERVER ERROR HANDLING
=================================*/
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "something broke",
  });
});
module.exports = app;