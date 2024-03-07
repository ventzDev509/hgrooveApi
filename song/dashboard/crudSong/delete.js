const { SONG } = require('../../../sequelize/sequelize')
const isLogin = require('../../../user/isLogin/isLogin');

module.exports = (app) => {
    app.post("/api/hgroove/v1/delete-song", isLogin, async (req, res) => {
        await SONG.destroy({ where: { id_song: req.body.code } })
            .then(response => {
                if (response == 1) {
                    res.status(200).json({ message: "song deleted successfully" })
                } else {
                    res.status(404).json({ message: "No song Found" })
                }
            })
            .catch(err => {
                res.json(err)
            })
    })
}