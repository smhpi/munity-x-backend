const links = require("./data.json");

function getAllLinks(_req, res) {
    return res.json({
        success: true,
        data: links
    })
}

function getLinks(req, res) {
    const requiredLink = req.params.links;
    const link = links.filter((link) => link.title === requiredLink);
    const exists = link.length > 0;

    return res
        .status(exists ? 200 : 404)
        .json({
            success: exists,
            data: exists ? link[0] : "Link not found"
        })
}

module.exports = {
    getAllLinks,
    getLinks
}