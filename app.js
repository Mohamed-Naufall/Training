const express = require('express');
const fs = require('fs');
const app = express();
const firebase = require('firebase');
const { nextTick } = require('process');


var firebase_config = firebase.initializeApp({
    apiKey: "AIzaSyCf6mM6gUd7JVi3_9F3y_aFHMt_zNu9n28",
    authDomain: "funnode-db.firebaseapp.com",
    databaseURL: "https://funnode-db-default-rtdb.firebaseio.com",
    projectId: "funnode-db",
    storageBucket: "funnode-db.appspot.com",
    messagingSenderId: "797522824346",
    appId: "1:797522824346:web:b8c90c61543c814372a323"
})

// const firebaseStoreData = require('./firebase/setDataFirebase')
// const firebase1 = require('./firebaseConnect')
app.use(express.json());


const port = process.env.PORT || 3000;

const tours = fs.readFileSync('./tours.json')
const toursData = JSON.parse(tours);

const users = fs.readFileSync('./users.json')
const usersData = JSON.parse(users);


app.get('/userss', (req, res) => {
    var firebaseRef = firebase.database().ref('users')
    firebaseRef.once('value', function(snapshot){
        let showData = snapshot.val();
        if(showData){
            res.status(200).json({
                status: 'success',
                data: {
                    showData
                }
            })
        } else {
            res.status(501).json({
                status: 'failure',
                data:{

                },
                message: 'There is no data..'
            })
        }
        
    })
})

app.get('/' , (req, res) => {
    res.send('Welcome to the Backend World....')
})

app.get('/tours', (req, res) => {

    res.status(200).json({
        status: 'success',
        data: {
            toursData
        }
    });
})




app.get('/test' , (req, res) => {
    res.send('This is the test api....')
})

app.get('/api',(req, res) => {

    res.status(200).json({
        status: 'success',
        data: {
            toursData
        }
    });
})

app.get('/api/:id',(req, res) => {
    id = req.params.id * 2;
    const tour = toursData.find(el => el.id === id)
    if (id > tour.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    res.status(200).json({
        status:'success',
        data: {
            tour
        }
    })

})
 
app.post('/postdata', async (req,res) => {
    let database = firebase.database();
    const customer_data = (req.body); 
    let data = await database.ref('/users').push(customer_data);
    res.status(200).json({
        status: 'success',
        data: data
    })
   
})
//CAUTION - THIS WILL DELETE THE ENTIRE COLLECTION OF USERS.
app.delete('/deletedata', async (req, res) => {
    let database = firebase.database();
    deletedData = await database.ref('users').remove();
    console.log(deletedData);
    res.status(200).json({
        status: 'success',
        message: 'Data deleted successfully'
    })
})

app.delete('/deleteSingleData/:id', async (req, res) => {
    let database = firebase.database();
    let id = req.params.id 
    console.log(id)
    let output = await database.ref(`users/` ).once('value');
    console.log(Object.keys(output.val()).map(e =>{console.log(e);}) );
    res.status(200).json({
        status: 'success',
        output
    })
})

app.put('/update/:id', async (req, res) => {
    let database = firebase.database();
    let id = req.params.id 
    console.log(id)
    let output = await database.ref(`users/${id}/`).update({nutrients:req.body.nutrients});
    res.status(200).json({
        status: 'success',
        output
    })
})

app.get('*', (req, res) => {
    res.status(404).json({
        status: 'failure', 
        data: { 
        },
        message: `You've entered the wrong path...`   
    })
})
app.listen(port, () => {
    console.log(`Server is listening to the port ${port}....`);
})