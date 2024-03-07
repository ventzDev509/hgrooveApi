const joi = require('joi')

function new_song_validation(body) {
    const validationSong = joi.object({
        id_song: joi.string(),
        user_id: joi.string().required(),
        title: joi.string().required(),
        artist: joi.string().required(),
        genre:joi.string(),
        image: joi.string().required(),
        url: joi.string().required(),
        dateCreate:joi.string().required(),
        tag:joi.string().required(),
        description:joi.string().required()

    })

    return {
        validationSong: validationSong.validate(body)
    }
}

module.exports = new_song_validation