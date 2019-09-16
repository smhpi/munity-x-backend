module.exports = function(app) {
  var linkList = require("../controllers/appController");
  app.route("/links").get(linkList.list_all_links);
};
