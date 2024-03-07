const { USER } = require('../../sequelize/sequelize')
const isLogin = require("../isLogin/isLogin")
require('dotenv').config()
module.exports = (app) => {
    app.post("/api/hgroove/v1/update-profile", isLogin, (req, res) => {
        const userLogin = req.userEmail;
        const path = process.env.LINK_PHP + "profile/" + req.body.profile
        USER.update({ profile: path }, { where: { email: userLogin } })
            .then(response => {
                res.json({ message: "Your profile as been Updating" })
            })
            .catch(err => {
                res.json(err)
            })
    })
}