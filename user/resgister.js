const { USER } = require('../sequelize/sequelize');
const registerValidate = require('../dataValidation/user/registerValidate');
const bcrypt = require('bcrypt')
const isLogin=require('./isLogin/isLogin')
module.exports = (app) => {
    app.post('/api/hgroove/v1/register', (req, res) => {
        console.log(req.body)

        function generateRandomString(length) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let randomString = '';
            for (let i = 0; i < length; i++) {
              const randomIndex = Math.floor(Math.random() * characters.length);
              randomString += characters.charAt(randomIndex);
            }
            return randomString;
          }
        // Validate registration form data
        const { error } = registerValidate(req.body).registerValidate
        if (error) {
            // If there's a validation error, return status 400 (Bad Request)
            return res.status(400).json({ error: error.details[0].message });
        }

        // Check if email already exists in the database
        USER.findOne({ where: { email: req.body.email } })
            .then(existingUser => {
                if (existingUser) {
                    // If user already exists, return status 409 (Conflict)
                    return res.status(409).json({ message: "Email already exists" });
                } else {
                    // password encryption using bcrypt
                    bcrypt.hash(req.body.password, 10)
                        .then(passwordEncryption => {
                            // Return an error message if there is an issue with hashing
                            if (!passwordEncryption) return res.status(500).json({ msg: "An error occurred, please try again later." });
                            // Create a new user
                            delete req.body.password;
                            const code = generateRandomString(20);
                            USER.create({ ...req.body, password: passwordEncryption ,user_id:code})
                                .then((user) => {
                                    // Return status 201 (Created) if user is successfully created
                                    res.status(201).json({ message: "User created successfully"});
                                })
                                .catch(error => {
                                    console.log(error)
                                    // If there's an error creating the user, return status 500 (Internal Server Error)
                                    res.status(500).json({ error: "Internal Server Error"  });
                                });

                        })


                }
            })
            .catch(error => {
                // If there's an error checking for existing user, return status 500 (Internal Server Error)
                res.status(500).json({ error: "Internal Server Error", error });
            });
    });
};
