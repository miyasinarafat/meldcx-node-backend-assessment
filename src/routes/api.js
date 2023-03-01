const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file.controller");
const upload = require("../middleware/file.middleware");
const {uploadLimiter, downloadLimiter} = require("../middleware/rate.limiter.middleware")

let routes = (app) => {
    router.post(
        "/files",
        [
            upload.single("file"),
            uploadLimiter
        ],
        fileController.upload
    );

    router.get("/files/:publicKey", downloadLimiter, fileController.download);
    router.delete("/files/:privateKey", fileController.destroy);

    return app.use("/", router);
};

module.exports = routes;