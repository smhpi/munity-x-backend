const route = require("express").Router();
const controller = require("./controller");

route.get("/all", controller.getAllLinks);
route.get("/:links", controller.getLinks);

module.exports = router;