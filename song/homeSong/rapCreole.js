
const { SONG, LIKE, USER } = require("../../sequelize/sequelize")
const isLogin = require('../../user/isLogin/isLogin')

module.exports = (app) => {
    // Route to get new additions, requires user to be logged in
    app.get("/api/hgroove/v1/rapCreole", isLogin, (req, res) => {
        // Get the logged-in user's email from the request
        const userLogin = req.userEmail

        // Find the user in the database with the provided email and active status
        USER.findOne({ where: { email: userLogin } })
            .then((dataUser) => {
                // If the user is found and is active
                if (dataUser) {
                    // Find all songs, including their likes, limited to 5 records
                    SONG.findAll(

                        {
                            include: [
                                {
                                    model: LIKE,
                                },

                            ],
                            order: [['created', 'DESC']], // Order by createdAt attribute in descending order
                            where: { genre: "rap-creole" },
                            limit: 5
                        }
                    )
                        .then(response => {
                            // For each song, check if it has been liked by the specified user
                            const formattedResponse = response.map(item => {

                                // Check if the currently logged-in user has liked this song
                                const isLiked = item.likes.some(like => like.userId === dataUser.id);

                                // Create a new data structure including isLiked for each song
                                return {
                                    ...item.toJSON(),
                                    isLiked: isLiked
                                };
                            });

                            // Send the formatted response as JSON
                            res.json(formattedResponse);
                        })
                        .catch(err => {
                            // Handle errors
                            res.json(err);
                        });
                }
            })
            .catch(() => {
                // Send a message if the user is not found or is not active
                res.json({ message: "you are not an artist" });
            });
    });
};
