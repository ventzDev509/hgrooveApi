const { DataTypes, Sequelize } = require('sequelize');
require('dotenv').config();


// Importing the  models
const User = require('../models/user');
const Song = require('../models/song');
const Like = require('../models/like');

// Creating a Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.USER_NAME, process.env.DB_PASSWORD, {
    host: process.env.HOST_NAME,
    port: process.env.DB_PORT,
    dialect: "mysql",
});

// Authenticating the connection
sequelize
    .authenticate()
    .then((_) => console.log("Connection has been established successfully."))
    .catch((error) => console.error("Unable to connect to the database:", error));


// Initializing the USER model
const USER = User(sequelize, DataTypes);
// Initializing the USER model
const SONG = Song(sequelize, DataTypes);
// Initializing the Like model
const LIKE = Like(sequelize, DataTypes);


//table relation

// song relation
SONG.hasMany(LIKE, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
LIKE.belongsTo(SONG, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// user relation
USER.hasMany(SONG, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
SONG.belongsTo(USER, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
USER.hasMany(LIKE, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
LIKE.belongsTo(USER, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Function to initialize the database
const initDb = () => {
    return sequelize.sync({ force: false }); // Syncing models with the database
};
module.exports = {
    initDb,
    USER,
    SONG,
    LIKE
};

