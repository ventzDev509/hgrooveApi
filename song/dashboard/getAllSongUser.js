const { Sequelize } = require('sequelize');
const { SONG, USER, LIKE } = require('../../sequelize/sequelize')
const isLogin = require('../../user/isLogin/isLogin')

module.exports = (app) => {
    app.get("/api/hgroove/v1/user-all-songs", isLogin, (req, res) => {
        const userLogin = req.userEmail;
        // Vérifier si l'utilisateur est un artiste
        USER.findOne({ where: { email: userLogin, status: 1 } })
            .then(isArtist => {
                if (isArtist) {
                    // Récupérer toutes les chansons de l'utilisateur
                    SONG.findAll({
                        where: { userId: isArtist.id },
                        include: [
                            {
                                model: LIKE,

                            }
                        ],
                    })
                        .then(response => {
                            let countLike = 0;
                            const formattedResponse = response.map(song => {
                                const isLiked = song.likes.some(like => like.userId === isArtist.id);
                                const likeCount = song.likes.length
                                countLike = countLike + likeCount

                                // Create a new data structure including isLiked for each song
                                return {
                                    ...song.toJSON(),
                                    isLiked: isLiked,
                                    likeCount: likeCount,
                                };
                            });
                            // Trier les chansons par likeCount du plus grand au plus petit
                            formattedResponse.sort((a, b) => b.likeCount - a.likeCount);
                            res.json({formattedResponse,countLike})
                        })
                        .catch(err => {
                            console.log(err)
                            res.json({ message: "No song Found" })
                        })
                } else {
                    res.json({ message: "You are not an Artist" })
                }

            })
            .catch(error => {
                console.log(error)
            })
    })
}
