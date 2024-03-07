const { SONG } = require('../../../sequelize/sequelize')
const isLogin=require('../../../user/isLogin/isLogin')
module.exports = (app) => {
    app.get("/api/hgroove/v1/get-song-infos/:code",isLogin, async (req, res) => {
        const codeSong = req.params.code;
        await SONG.findAll({ where: { id_song: codeSong } })
            .then(response => {
                if (response) {
                    res.json(response)
                } else {
                    res.status(404).json({ message: "No song Found" })
                }
            })
    })
}