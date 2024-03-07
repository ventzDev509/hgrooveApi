const { USER } = require('../sequelize/sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const LoginValidate = require('../dataValidation/user/Login');
const privateKey = require('./isLogin/privatekeys');
require('dotenv').config();

module.exports = (app) => {
    app.post('/api/hgroove/v1/login', (req, res) => {
        const { error } = LoginValidate(req.body).LoginValidate
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        USER.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (user) {
                    bcrypt.compare(req.body.password, user.password)
                        .then(matchPassword => {
                            if (matchPassword) {
                                // If password matches, generate JWT token
                                const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY_USER, { expiresIn: '7d' });
                                res.status(200).json({ message:"Login successfully",token });
                            } else {
                                // If password doesn't match, return error
                                res.status(401).json({ error: "Email or Password is incorrect" });
                            }
                        })
                        .catch(error => {
                            // Handle bcrypt error
                            res.status(500).json({ error: "Internal Server Error" });
                        });
                } else {
                    // If user doesn't exist, return error
                    res.status(401).json({ error: "Email or Password is incorrect" });
                }
            })
            .catch(error => {
                // Handle database error
                console.error("Error finding user:", error);
                res.status(500).json({ error: "Internal Server Error" });
            });
    });
};
