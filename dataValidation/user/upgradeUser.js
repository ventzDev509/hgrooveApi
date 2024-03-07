const joi = require('joi')

function upgrade_user(body) {
    const upgradeUser = joi.object({
        dateOfBirth: joi.string().required(),
        cityBorn: joi.string().required(),
        adress: joi.string().required(),
        about: joi.string().required(),
        profile: joi.string(),
    })
    return {
        upgradeUser: upgradeUser.validate(body)
    }
}
module.exports = upgrade_user