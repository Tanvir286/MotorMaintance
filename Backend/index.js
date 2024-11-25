require('dotenv').config();
const app = require('./app')

// Start the server
const PORT = process.env.PORT || 3100;


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});