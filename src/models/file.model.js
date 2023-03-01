const bcrypt = require('bcrypt');

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
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    file.publicKey = bcrypt.hashSync(file.type, salt);
                    file.privateKey = bcrypt.hashSync(file.filename, salt);
                }
            },
        },
    });
};
