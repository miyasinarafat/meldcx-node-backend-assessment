const fs = require('fs');
const { Op } = require("sequelize");

const db = require("../models");

const File = db.files;

let filesCleanup = () => {
    try {
        File.findAll({
            where: {
                updatedAt: {
                    /* Querying files that have been not download before the last 7 days. */
                    [Op.lt]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
                },
            }
        }).then(files => {
            let totalDeletedFiles = 0;

            files.forEach(function (file) {
                fs.unlinkSync(file.path);
                file.destroy();

                ++totalDeletedFiles;
            });

            console.info(`The total ${totalDeletedFiles} number files has been cleaned up.`);
        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
        });
    } catch (error) {
        console.error('Error when trying delete file : ', error);
    }
};

module.exports = filesCleanup;