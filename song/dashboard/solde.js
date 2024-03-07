const { Sequelize } = require("sequelize")
const { SONG, USER, LIKE } = require("../../sequelize/sequelize")
const isLogin = require('../../user/isLogin/isLogin')
module.exports = (app) => {
    app.get("/api/hgroove/v1/song-sold", isLogin, async (req, res) => {
        const userLogin = req.userEmail
        USER.findOne({ where: { email: userLogin, status: 1 } })
            .then(response => {
                if (response) {
                    SONG.findAll(

                        { // Filter by song ID
                            where: { userId: response.id },
                            include: [{
                                model: LIKE,
                            }]

                        })
                        .then(songs => {

                            if (songs) {
                                res.json(songs)
                            } else {
                                res.json({ message: "No song found" })
                            }
                        })
                        .catch(err => {
                            res.json(err)
                            console.log(err)
                        })
                } else {
                    res.json({ msg: "you are not an artist" })
                }
            })

    })
}