const db = require("../models");

const File = db.files;

const upload = async (req, res) => {
    try {
        console.log(req.file);

        if (req.file === undefined) {
            return res.send({
                error: 'You must select a file.',
            });
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

        return res.send({
            error: `Error when trying upload file: ${error}`,
        });
    }
};

module.exports = {
    upload,
};