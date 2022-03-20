module.exports = app => {
    const card = require("../controllers/card.controller.js");

    var router = require("express").Router();

    router.post("/", card.create);

    app.use("/api", router);
};