const fs = require('fs');

const db = require("../models");

const File = db.files;

const upload = async (req, res) => {
    try {
        if (req.file === undefined) {
            return res.send({
                error: 'You must select a file.',
            });
        }

        File.create({
            type: req.file.mimetype,
            filename: req.file.filename,
            path: req.file.path,
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

const download = async (req, res) => {
    try {
        let publicKey = req.params.publicKey;

        if (publicKey === undefined) {
            return res.send({
                error: 'You must provide publicKey to download a file.',
            });
        }

        const file = await File.findOne({ where: { publicKey : publicKey } });

        if (file === null) {
            return res.send({
                error: 'File not found!',
            });
        }

        const fileStream = fs.createReadStream(file.path);

        fileStream.on('open', () => {
            res.attachment(file.filename);
            fileStream.pipe(res);
        });

        fileStream.on('error', err => {
            return res.send({
                error: err,
            });
        });

    } catch (error) {
        console.log(error);

        return res.send({
            error: `Error when trying download file: ${error}`,
        });
    }
};

const destroy = async (req, res) => {
    try {
        let privateKey = req.params.privateKey;

        if (privateKey === undefined) {
            return res.send({
                error: 'You must provide privateKey to delete a file.',
            });
        }

        const file = await File.findOne({ where: { privateKey : privateKey } });
        const deleteFile = await File.destroy({ where: { privateKey : privateKey } });

        if (deleteFile === 0) {
            return res.send({
                error: 'File not found!',
            });
        }

        fs.unlinkSync(file.path);

        return res.send({
            message: 'File has been deleted.',
        });

    } catch (error) {
        console.log(error);

        return res.send({
            error: `Error when trying delete file: ${error}`,
        });
    }
};

module.exports = {
    upload,
    download,
    destroy,
};