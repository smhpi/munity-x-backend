var Link = require("../model/appModel.js");

exports.list_all_links = function(req, res) {
  Link.getAllLinks(function(err, prod) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", prod);
    res.send(prod);
  });
};
