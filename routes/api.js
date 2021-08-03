// const express = require('express');
// const router = express.Router();
// const firebase_config = require('./../firebase/firebaseConnect');
// var database = firebase.database();
// app.use(express.json());

// //@type GET
// //@route /api/users
// //@desc To show the data from the firebase realtime database
// //@access PUBLIC

// router.get('/users', (req, res) => {
//     var firebaseRef = firebase.database().ref('users')
//     firebaseRef.once('value', function(snapshot){
//         let showData = snapshot.val();
//         if(showData){
//             res.status(200).json({
//                 status: 'success',
//                 data: {
//                     showData
//                 }
//             })
//         } else {
//             res.status(501).json({
//                 status: 'failure',
//                 data:{

//                 },
//                 message: 'There is no data..'
//             })
//         }
        
//     })
// })