
const { Op } = require("sequelize");
const { LIKE, USER } = require("../../sequelize/sequelize")
const likeDislikeValidate = require("../../dataValidation/like/likeAndDislike")
const isLogin = require("../../user/isLogin/isLogin")
module.exports = (app) => {
    app.post("/api/hgroove/v1/like", isLogin, async (req, res) => {
        const userLogin = req.userEmail;
        const { error } = likeDislikeValidate(req.body).likeDislikeValidate
        if (error) {
            res.status(400).json({ message: error.details[0].message })
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
                                    res.json({ message: "You already liked this song" })
                                } else {
                                    LIKE.create({ ...req.body, userId: user.id })
                                        .then(response => {

                                            res.json({ message: "You liked this song" })
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        })
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