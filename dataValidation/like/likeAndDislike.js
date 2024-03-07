const joi = require('joi')

function likeDislike(body) {
    const likeDislike = joi.object({
        songId: joi.required(),
    })

    return {
        likeDislikeValidate: likeDislike.validate(body)

    }
}
module.exports=likeDislike