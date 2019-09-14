var http = require("http");
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var admin = require('firebase-admin');
var serviceAccount = require('./lib/scotiabank-516dd-firebase-adminsdk-jay8o-531f1e60c5.json');

app.use(cors({ origin: true }))
    .use(bodyParser.json())
    .use(express.static('public'));

app.listen(5000, () => console.log('Listening to  port 5000'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://scotiabank-516dd.firebaseio.com'
});
let db;
app.get("/api/links", async(req, res) => {
    try {
        db = admin.firestore();
        const linksQuery = await db.collection("links").get();
        const links = [];
        linksQuery.forEach(link => {
            links.push({
                id: link._fieldsProto.id.integerValue,
                title: link._fieldsProto.title.stringValue,
                cpu: link._fieldsProto.cpu.stringValue
            })

        });
        res.json(links);
    } catch (error) {
        res.status(500).send(error);
    }
})