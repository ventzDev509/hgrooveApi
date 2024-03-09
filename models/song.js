module.exports = (sequelize, DataTypes) => {
    const Song = sequelize.define('song', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_song: {
            type: DataTypes.STRING,
            allowNull: false
        },
       
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false
        },
        album: {
            type: DataTypes.STRING,
            allowNull: true
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dateCreate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        solde: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        }
    }, {
        timestamps: true,
        createdAt: "created",
        updatedAt: false,
    });

    Song.associate = (models) => {
        Song.belongsTo(models.user, { foreignKey: 'user_id' });
    };

    return Song;
};
