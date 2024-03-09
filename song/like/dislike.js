
const { Op } = require("sequelize");
const likeDislikeValidate = require('../../dataValidation/like/likeAndDislike')
const { LIKE, USER, SONG } = require("../../sequelize/sequelize")
const isLogin = require("../../user/isLogin/isLogin")
require('dotenv').config()
module.exports = (app) => {
    app.post("/api/hgroove/v1/dislike", isLogin, async (req, res) => {
        const userLogin = req.userEmail;
        const { error } = likeDislikeValidate(req.body).likeDislikeValidate
        if (error) {
            res.status(400).json(error.details[0].message)
        } else {
            USER.findOne({ where: { email: userLogin } })
                .then(user => {
                    if (user) {
                        LIKE.findAll({
                            where: {
                                userId: user.id,
                                [Op.and]: {
                                    songId: req.body.songId,
                                }
                            }
                        })
                            .then(isLiked => {

                                if (isLiked.length > 0) {
                                    SONG.findOne({
                                        where: { id: req.body.songId }, include: [
                                            {
                                                model: LIKE,

                                            }
                                        ],
                                    })
                                        .then(soldeInit => {
                                            if (soldeInit) {
                                                let isLiked = soldeInit.likes.some(like => like.userId === user.id);

                                                //add some money to the user count when a song was liked
                                                const tarrifLike = process.env.MOUNTLIKE;
                                                USER.findOne({ where: { id: soldeInit.userId } })
                                                    .then(artist => {

                                                        if (isLiked) {
                                                            const solde = artist.solde;
                                                            if (solde > 0 && soldeInit.solde > 0) {

                                                                LIKE.destroy({ where: { userId: user.id, songId: req.body.songId } })
                                                                    .then(response => {
                                                                        let newSolde = (solde - parseFloat(tarrifLike));
                                                                        USER.update({ solde: newSolde }, { where: { id: soldeInit.userId } })
                                                                        let songSolde = (soldeInit.solde - parseFloat(tarrifLike));
                                                                        SONG.update({ solde: songSolde }, { where: { id: soldeInit.id } })
                                                                        res.json({ message: "You have disliked this song" })

                                                                    })
                                                                    .catch(error => {
                                                                        console.log(error)
                                                                    })
                                                            }

                                                        }
                                                    })
                                            }
                                        })


                                } else {
                                    res.json({ message: "You have not liked this song" })
                                    console.log("...................jkhbv")
                                }
                            })

                    } else {
                        res.json({ message: "you are not an artist" })

                    }
                })
                .catch(error => {
                    console.error("Error finding user:", error);
                    res.status(500).json('Internal Error');
                })
        }

    })
}