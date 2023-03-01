module.exports = (sequelize, DataTypes) => {
    return sequelize.define("file", {
        type: {
            type: DataTypes.STRING,
        },
        filename: {
            type: DataTypes.STRING,
        },
        publicKey: {
            type: DataTypes.STRING,
        },
        privateKey: {
            type: DataTypes.STRING,
        },
    });
};
