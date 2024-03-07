const { SONG, USER } = require('../../../sequelize/sequelize')
const isLogin = require('../../../user/isLogin/isLogin')
module.exports = (app) => {
    // adm 1 anchca 1 a
    app.post('/api/hgroove/v1/update/:id', isLogin, (req, res) => {
        const id = req.params.id
        const userLogin = req.userEmail;
        USER.findOne({ where: { email: userLogin, status: 1 } })
            .then(response => {
                if (response) {

                    SONG.update(req.body, {
                        where: {
                            id_song: id
                        }
                    })
                        .then(result => {
                            if (result==1) {
                                res.json({ message: "Song Update Successfully" });
                            } else {
                                res.json({ message: "No data change" });
                            }
                        })
                        .catch((err) => console.log(err))
                }
            })
            .catch(err => {
                console.log(err)
            })



    })
}
