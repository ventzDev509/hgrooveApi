const { USER } = require("../sequelize/sequelize");
const isLogin = require('./isLogin/isLogin');
const upgradeUser = require('../dataValidation/user/upgradeUser');

module.exports = (app) => {
    app.post('/api/hgroove/v1/upgrade', isLogin, (req, res) => {
        // Extract user email from the request object provided by the isLogin middleware
        const userLogin = req.userEmail;
        // Find the user in the database
        USER.findOne({ where: { email: userLogin } })
            .then(user => {
                if (user) {
                    // Check if the user is already an artist
                    USER.findOne({ where: { status: 1,email:userLogin } })
                        .then(isArtist => {
                            if (isArtist) {
                                // If user is already an artist, return a message
                                res.json({ message: "You are already an Artist" });
                            } else {
                                // Validate the upgrade request data
                                const { error } = upgradeUser(req.body).upgradeUser
                                if (error) return res.status(400).json({ error: error.details[0].message });

                                // Update user status to indicate upgrade
                                const newStatus = 1; // Assuming 1 represents artist status
                                USER.update({ ...req.body, status: newStatus }, { where: { email: userLogin } })
                                    .then(() => {
                                        res.json({ message: "Your account has been upgraded" });
                                    })
                                    .catch(error => {
                                        res.status(500).json({ error: "Internal Server Error" });
                                    });
                            }
                        })
                        .catch(error => {
                            res.status(500).json({ error: "Internal Server Error" });
                        });
                } else {
                    // If user doesn't exist, return an error message
                    res.status(404).json({ error: "User not found" });
                }
            })
            .catch(error => {
                console.error("Error finding user:", error);
                res.status(500).json({ error: "Internal Server Error" });
            });
    });
};
