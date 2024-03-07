module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('like', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
       

       
    }, {
        timestamps: true,
        createdAt: "created",
        updatedAt: false,
    });

    Like.associate = (models) => {
        Like.belongsTo(models.song, { foreignKey: 'song_id' });
        Like.belongsTo(models.user, { foreignKey: 'userId' });


    };

    return Like;
};
