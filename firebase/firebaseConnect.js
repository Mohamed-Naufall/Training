const firebase = require('firebase');
var firebase_config = firebase.initializeApp({
    apiKey: "AIzaSyCf6mM6gUd7JVi3_9F3y_aFHMt_zNu9n28",
    authDomain: "funnode-db.firebaseapp.com",
    databaseURL: "https://funnode-db-default-rtdb.firebaseio.com",
    projectId: "funnode-db",
    storageBucket: "funnode-db.appspot.com",
    messagingSenderId: "797522824346",
    appId: "1:797522824346:web:b8c90c61543c814372a323"
})

module.exports = firebase_config;