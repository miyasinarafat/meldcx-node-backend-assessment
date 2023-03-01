const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file.controller");
const upload = require("../middleware/file.middleware");

let routes = (app) => {
    router.post("/files", upload.single("file"), fileController.upload);
   router.get("/files/:publicKey", fileController.download);

    return app.use("/", router);
};

module.exports = routes;