var db = require("../../db.js");

//Task object constructor
var Link = function(prod) {
  this.title = prod.title;
  this.id = prod.id;
  this.cpu = prod.cpu;
};

Link.getAllLinks = getAllLinks = async (req, res) => {
  try {
    const linksQuery = await db.collection("links").get();
    const links = [];
    linksQuery.forEach(link => {
      links.push({
        id: link._fieldsProto.id.integerValue,
        title: link._fieldsProto.title.stringValue,
        cpu: link._fieldsProto.cpu.stringValue
      });
    });
    console.log(links);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = Link;
