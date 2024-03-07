const { SONG, USER } = require("../sequelize/sequelize");
const validationSong = require("../dataValidation/addSong/new_songValidate");
const isLogin = require("../user/isLogin/isLogin");
require("dotenv").config();

module.exports = (app) => {
    app.post("/api/hgroove/v1/add-newsong", isLogin, async (req, res) => {
        const userLogin = req.userEmail;

        // Check if the logged-in user is an artist
        USER.findOne({ where: { email: userLogin, status: 1 } })
            .then(isArtist => {
                if (isArtist) {
                    // Validate the new song data
                    const { error } = validationSong(req.body);
                    if (error) {
                        return res.status(400).json({ error: error.details[0].message });
                    } else {
                        // Generate a random string for song ID
                        function generateRandomString(length) {
                            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                            let randomString = '';
                            for (let i = 0; i < length; i++) {
                                const randomIndex = Math.floor(Math.random() * characters.length);
                                randomString += characters.charAt(randomIndex);
                            }
                            return randomString;
                        }

                        // Construct paths for song image and URL based on environment variables
                        const cover_path = process.env.LINK_PHP + "images/" + req.body.image;
                        const song_path = process.env.LINK_PHP + "songs/" + req.body.url;

                        // Remove unnecessary properties from the request body
                        delete req.body.images;
                        delete req.body.url;

                        // Generate a unique song ID and add the song to the database
                        const code = generateRandomString(20);
                        SONG.create({ ...req.body, id_song: code, image: cover_path, url: song_path,userId:isArtist.id })
                            .then(() => {
                                res.status(200).json({ message: "Song added successfully" });
                            }).catch((err) => {
                                console.error("Error adding song:", err);
                                res.status(500).json('Internal Error');
                            });
                    }
                } else {
                    // If the user is not an artist, return an error message
                    res.status(403).json({ message: "You are not an artist." });
                }
            })
            .catch(error => {
                console.error("Error finding user:", error);
                res.status(500).json('Internal Error');
            });
    });
};
