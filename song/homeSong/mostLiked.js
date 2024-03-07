const { Sequelize } = require("sequelize");
const { SONG, LIKE, USER } = require("../../sequelize/sequelize");
const isLogin = require('../../user/isLogin/isLogin');

module.exports = (app) => {
    // Route to get the most liked additions
    app.get("/api/hgroove/v1/mostLiked", isLogin, (req, res) => {
        // Get the logged-in user's email from the request
        const userLogin = req.userEmail;

        // Find the user in the database with the provided email and active status
        USER.findOne({ where: { email: userLogin } })
            .then((dataUser) => {
                // If the user is found and is active
                if (dataUser) {
                    // SQL query to count likes for each song
                    SONG.findAll({
                        include: [
                            {
                                // Include the SONG model to get song details
                                model: LIKE,
                            }
                        ],
                        limit: 5 // Limit the results to 5
                    })
                        .then(response => {
                
                            // For each song, create a new data structure including the number of likes
                            const formattedResponse = response.map(item => {
                               
                                const isLiked = item.likes.some(like => like.userId === dataUser.id);
                                const likeCount = item.likes.length
                              
                             
                                return {
                                    ...item.toJSON(),
                                    likeCount: likeCount,// Access likeCount directly from item
                                    isLiked: isLiked
                                };
                            });
                           
                            // Trier les chansons par likeCount du plus grand au plus petit
                            formattedResponse.sort((a, b) => b.likeCount - a.likeCount);
                            res.json(formattedResponse);

                        })
                        .catch(err => {
                            // Handle errors
                            res.json(err);
                        });
                } else {
                    // Send a message if the user is not found or is not active
                    res.json({ message: "you are not an artist" });
                }
            })
            .catch(() => {
                // Send a message if there's an error finding the user
                res.json({ message: "Error finding user" });
            });
    });
};
