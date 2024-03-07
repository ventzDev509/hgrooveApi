/*
 * This middleware checks for the presence of a valid token in the request header.
 * It verifies the token using JWT and attaches the user's email to the request object.
 */

// Importing necessary modules and dependencies
const jwt = require('jsonwebtoken');
require('dotenv').config();
const privateKey=require('./privatekeys')
// Exporting the middleware function
module.exports = (req, res, next) => {
    // Extract the authorization header from the request
    const authorization = req.headers.authorization;

    // Check if the authorization header is missing
    if (!authorization) {
        const msg = "You did not provide a token";
        return res.status(401).json({ msg });
    }

    // Extract the token from the authorization header
    const token = authorization.split(' ')[1];
    console.log(token)

    try {
        // Verify the token using the secret key
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY_USER);

        // Extract the user's email from the decoded token
        const user_mail = decodedToken.email;

        // Check if the provided email in the request body matches the decoded email
        if (req.body.email && req.body.email !== user_mail) {
            const msg = "Invalid identifiant";
            return res.status(401).json({ msg,user_mail });
        }

        // Attach the user's email to the request object
        req.userEmail = user_mail;
        next();
    } catch (error) {
        // Token verification failed, return an unauthorized status
        const msg = "You should log in";
        res.status(401).json({ msg, data: error });
    }
};
