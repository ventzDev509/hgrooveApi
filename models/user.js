module.exports = (sequelize, DataType) => {
    const User = sequelize.define('user', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataType.STRING,
            allowNull: false,
        },
        username: {
            type: DataType.STRING,
            allowNull: false
        },
        email: {
            type: DataType.STRING,
            allowNull: false
        },
        password: {
            type: DataType.STRING,
            allowNull: false
        },
        dateOfBirth: {
            type: DataType.STRING
        },
        cityBorn: {
            type: DataType.STRING
        },
        adress: {
            type: DataType.STRING,
        },
        about: {
            type: DataType.STRING
        },
        profile: {
            type: DataType.STRING
        }
        ,
        status: {
            type: DataType.INTEGER,
            defaultValue: 0
        },
        solde:{
            type :DataType.DOUBLE,
        }
    },
        {
            timestamps: true,
            createdAt: "created",
            updatedAt: false,
        }
    )
    User.associate = (models) => {
        models.User.hasMany(models.Like, {
            foreignKey: 'userId'
        })
        models.User.hasMany(models.Song, {
            foreignKey: 'userId'
        })

    }
    return User;
}