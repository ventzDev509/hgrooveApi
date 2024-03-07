const joi = require('joi')

function Login(body) {
    const LoginValidate = joi.object({
        email: joi.string().required(),
        password: joi.string().required()
    })
    return {
        LoginValidate: LoginValidate.validate(body)
    }
}
module.exports = Login