const hasha = require('hasha');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("file", {
        type: {
            type: DataTypes.STRING,
        },
        filename: {
            type: DataTypes.STRING,
        },
        path: {
            type: DataTypes.STRING,
        },
        publicKey: {
            type: DataTypes.STRING,
            allowNull: true
        },
        privateKey: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        hooks: {
            beforeCreate: async (file) => {
                if (file.filename && file.type) {
                    file.publicKey = hasha(file.type, {algorithm: 'sha256'});
                    file.privateKey = hasha(file.filename, {algorithm: 'sha256'});
                }
            },
        },
    });
};
