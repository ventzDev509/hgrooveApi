const { Sequelize } = require("sequelize")
const https = require('https');
const { SONG, USER, LIKE } = require("../../sequelize/sequelize")
const isLogin = require('../../user/isLogin/isLogin')
const fs = require('fs');
const axios = require('axios');
const NodeID3 = require('node-id3');

module.exports = (app) => {
    app.get("/api/hgroove/v1/song-sold", isLogin, async (req, res) => {
        const userLogin = req.userEmail
        // Créer un agent HTTPS personnalisé qui ignore la vérification du certificat
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false
        });
        const addImageMetadataToAudio = async (audioUrl, imageUrl, audioFilePath) => {
            try {
                // Télécharger l'image depuis l'URL avec l'agent HTTPS personnalisé
                const response = await axios.get(imageUrl, {
                    responseType: 'arraybuffer',
                    httpsAgent: httpsAgent
                });
                const imageBuffer = Buffer.from(response.data, 'binary');

                // Créer un objet de métadonnées
                const tags = {
                    title: 'Titre de votre audio',
                    artist: 'Artiste de votre audio',
                    album: 'Album de votre audio',
                    // Ajouter l'image encodée en base64
                    image: {
                        mime: 'image/jpeg',
                        type: { id: 3, name: 'front cover' },
                        description: 'Pochette d\'album',
                        imageBuffer: imageBuffer,
                    },
                };

                // Ajouter les métadonnées au fichier audio
                NodeID3.write(tags, audioFilePath);

                console.log('Les métadonnées ont été ajoutées avec succès au fichier audio.');
            } catch (error) {
                console.error('Une erreur s\'est produite lors de l\'ajout de métadonnées au fichier audio :', error);
            }
        };


        // // URL du fichier audio et de l'image
        // const audioUrl = 'https://hgroove.rf.gd/songs/Durkheim - Kow Kow (Official Video)(M4A_128K).mp3';
        // const imageUrl = 'https://hgroove.rf.gd/images/baky.png?i=1';


        // const audioFilePath = 'https://hgroove.rf.gd/songs/Durkheim - Kow Kow (Official Video)(M4A_128K).mp3'; // Définir le chemin du fichier audio
        // const tags = NodeID3.read(audioFilePath)
        // console.log(tags)

        // Appeler la fonction pour ajouter les métadonnées au fichier audio
        // addImageMetadataToAudio(audioUrl, imageUrl, audioFilePath);

        USER.findOne({ where: { email: userLogin, status: 1 } })
            .then(response => {
                if (response) {
                    SONG.findAll(

                        { // Filter by song ID
                            where: { userId: response.id },
                            include: [{
                                model: LIKE,
                            }]

                        })
                        .then(songs => {

                            if (songs) {
                                const formattedResponse = songs.map(song => {
                                    const isLiked = song.likes.some(like => like.userId === response.id);
                                    const likeCount = song.likes.length

                                    // Create a new data structure including isLiked for each song
                                    return {
                                        ...song.toJSON(),
                                        isLiked: isLiked,
                                    };
                                });
                                res.json(formattedResponse)
                            } else {
                                res.json({ message: "No song found" })
                            }
                        })
                        .catch(err => {
                            res.json(err)
                            console.log(err)
                        })
                } else {
                    res.json({ msg: "you are not an artist" })
                }
            })

    })
}