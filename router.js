var express = require("express"); // call express
var router = express.Router(); // get an instance of the express Router
var admin = require('firebase-admin');
var serviceAccount = require('./lib/scotiabank-516dd-firebase-adminsdk-jay8o-531f1e60c5.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://scotiabank-516dd.firebaseio.com'
});

router
    .route("/")
    .get(function(req, res, err) {

        // Get a database reference to our posts
        var db = admin.database();
        var ref = db.ref("/restau");

        // Attach an asynchronous callback to read the data at our posts reference
        ref.on("value", function(snapshot) {
            console.log(snapshot.val());
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    });
module.exports = router;