const { USER } = require("../../sequelize/sequelize")

module.exports = (app) => {
    app.get("/api/hgroove/v1/artist", async (req, res) => {
        await USER.findAll({where:{status:1}})
            .then(artist => {
                if (artist) {
                    res.status(200).json({ artist })
                }
                else {
                    res.status(404).json({ message: "no artist found" })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    })
}