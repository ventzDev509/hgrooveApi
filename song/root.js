module.exports = (app) => {
    
    //Dasboard
    require('./add')(app)
    require('./dashboard/solde')(app)
    require("./dashboard/getAllSongUser")(app)
    require('./dashboard/crudSong/read')(app)
    require('./dashboard/crudSong/update')(app)
    require("./dashboard/crudSong/delete")(app)
    require('./dashboard/crudSong/search')(app)
    require('./dashboard/crudSong/searchAll')(app)


    // home song
    require("./homeSong/newAdd")(app)
    require("./homeSong/mostLiked")(app)
    require('./homeSong/rapCreole')(app)
    require('./getAllSong')(app)



    // like and dislike song
    require("./like/like")(app)
    require('./like/dislike')(app)
}
