const firebase  = require('firebase');
require ("firebase/firestore");
const data = require('./quran.json')
const config = require('./firebaseConfig');

firebase.initializeApp(config);
var db = firebase.firestore();

data.forEach(element => {
    db.collection("quran").doc("sura").add({
        id: element.suraNumber,
        suraName: element.suraName,
        aya: element.aya
    }).then(
        docRef =>{
            console.log("Document written with ID: ", docRef.id);
        }
    )
});