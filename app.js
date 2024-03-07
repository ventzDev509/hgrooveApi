const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();
const sequelize =require('./sequelize/sequelize')

//init the conn of the DB
sequelize.initDb()

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// route for user register and Login 
require('./user/root')(app)

//route for Song (creat,read,update,delete)
require('./song/root')(app)


//route for Artist (creat,read,update,delete)
require("./artist/root")(app)

require('./mocash/init')(app)
require('./mocash/er')(app)

// Catch-all middleware for handling 404 errors

app.use(({ res }) => {
    res.status(404).json("Error: Page not found");
});

// Start the server
app.listen(process.env.APP_PORT, () => console.log(`App started on port ${process.env.APP_PORT}`));
