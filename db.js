var admin = require("firebase-admin");
var serviceAccount = require("./lib/scotiabank-516dd-firebase-adminsdk-jay8o-531f1e60c5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://scotiabank-516dd.firebaseio.com"
});
const db = admin.firestore();

module.exports = db;
