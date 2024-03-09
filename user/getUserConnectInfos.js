const { USER } = require('../sequelize/sequelize')
const isLogin = require("./isLogin/isLogin")
module.exports = (app) => {
    app.get('/api/hgroove/v1/userInfos', isLogin, (req, res) => {
        const email = req.userEmail
        USER.findAll({ where: { email: email } })
            .then(user => {
                if (user) {
                    // If user exists, construct and return user information
                    const data = [
                        {
                            id:user[0].id,
                            user_id: user[0].user_id,
                            username: user[0].username,
                            email: user[0].email,
                            dateOfBirth: user[0].dateOfBirth,
                            cityBorn: user[0].cityBorn,
                            adress: user[0].adress,
                            about: user[0].about,
                            profile: user[0].profile,
                            status: user[0].status,
                            solde:user[0].solde
                        },
                    ];
                    res.json(data)
                } else {
                    // If user not found, return an error message
                    res.status(404).json({ error: "User not found" });
                }
            })
            .catch(error => {
                // Handle any database error
                console.log(error)
            })
    })
}