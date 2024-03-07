const joi = require('joi')

function Register(body) {
    const registerValidate = joi.object({
        username: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(10).required()
    })
    return {
        registerValidate: registerValidate.validate(body)
    }
}
module.exports = Register