const { Op } = require('sequelize');
const { SONG, USER, LIKE } = require('../../../sequelize/sequelize')
const isLogin = require('../../../user/isLogin/isLogin')
module.exports = (app) => {
    app.get("/api/hgroove/v1/search/:search", isLogin, (req, res) => {
        const userLogin = req.userEmail;
        const search = req.params.search
        USER.findOne({ where: { email: userLogin, status: 1 } })
            .then((user) => {
                if (user) {
                    SONG.findAll({
                        where: {
                            userId: user.id,
                            title: {
                                [Op.like]: `%${search}%`
                            },

                        },
                        include: [
                            {
                                // Include the SONG model to get song details
                                model: LIKE,

                            }
                        ],
                    }
                    )
                        .then(result => {
                            if (result) {
                                // For each song, create a new data structure including the number of likes
                                const formattedResponse = result.map(result => {
                                    const isLiked = result.likes.some(like => like.userId === user.id);
                                    const likeCount = result.likes.length
                                    return {
                                        ...result.toJSON(),
                                        likeCount: likeCount,// Access likeCount directly from item
                                        isLiked: isLiked
                                    };
                                });
                                res.status(200).json(formattedResponse)
                            } else {
                                res.status(404).json({ message: "song not found" })
                            }
                        })
                }
                else {
                    res.status(404).json({ message: "user not found" })
                }
            })


    })
}