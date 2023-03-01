const multer = require("multer");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/storage/static/files/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-meldcx-${file.originalname}`);
    },
});

let uploadFile = multer({ storage: storage });

module.exports = uploadFile;
