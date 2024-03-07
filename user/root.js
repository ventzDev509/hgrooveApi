module.exports=(app)=>{
    require('./resgister')(app)
    require("./login")(app)
    require('./upgrade_profile')(app)
    require('./getUserConnectInfos')(app)
    require("./update_profile/updateProfile")(app)
}