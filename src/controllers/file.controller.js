const fs = require("fs");
const db = require("../models");

const File = db.files;

const uploadFiles = async (req, res) => {
    try {
        console.log(req.file);

        if (req.file === undefined) {
            return res.send(`You must select a file.`);
        }

        File.create({
            type: req.file.mimetype,
            filename: req.file.originalname,
        }).then((file) => {

            return res.send({
                data: {
                    filename: file.filename,
                    publicKey: file.publicKey,
                    privateKey: file.privateKey,
                },
                message: 'File has been uploaded.',
            });
        });
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
};

module.exports = {
    uploadFiles,
};