const express = require('express');
const fs = require('fs');
const app = express();
const firebase = require('firebase');
const axios = require('axios');

//npm axios searchanise (third party)


var firebase_config = firebase.initializeApp({
    apiKey: "AIzaSyCf6mM6gUd7JVi3_9F3y_aFHMt_zNu9n28",
    authDomain: "funnode-db.firebaseapp.com",
    databaseURL: "https://funnode-db-default-rtdb.firebaseio.com",
    projectId: "funnode-db",
    storageBucket: "funnode-db.appspot.com",
    messagingSenderId: "797522824346",
    appId: "1:797522824346:web:b8c90c61543c814372a323"
})

var database = firebase.database();

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

app.get('/getbyID/:id',  (req,res) => {
    try{    
        let id = req.params.id
        var firebaseRef = firebase.database().ref(`users/${id}`);
        firebaseRef.once('value', function(snapshot){
        let items = snapshot.val();     
        res.status(200).json({
            staus: 'success',
            data: {
                items
            }
        })
    })
} catch{
    res.status(404).json({
        status: 'failure',
        data: {
            message: 'There is no data'
        }
    })
}

})

const searchaniseKey = 'https://www.searchanise.com/getwidgets?apiKey=0E2E8p9Z7X'
console.log(searchaniseKey);


app.get('/searchanniseData', (req, res) => {
    var axiosData = axios.get('https://www.searchanise.com/getwidgets?apiKey=0E2E8p9Z7X')
        .then(output => res.send(output.data))
        .catch(err => console.log(err))
})

// axios.get('https://www.searchanise.com/getwidgets?apiKey=0E2E8p9Z7X')
//     .then(res=>console.log(res.data))
//     .catch(err => console.log(err));

app.get('/getbyArray/:id',  (req,res) => {
    try{      
        let id = req.params.id
        var firebaseRef = database.ref('users');
        firebaseRef.once('value', function(snapshot){
        let items = snapshot.val();
        arrayItem = items.map(element => {
            return element
        });
        res.status(200).json({
            staus: 'success',
            data: {
                 array: arrayItem[id]
            }
        })
    })
} catch{
    res.status(404).json({
        status: 'failure',
        data: {
            message: 'There is no data'
        }
    })
}

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
    const customer_data = (req.body); 
    let data = await database.ref('/users').push(customer_data);
    res.status(200).json({
        status: 'success',
        data: data
    })
   
})
//CAUTION - THIS WILL DELETE THE ENTIRE COLLECTION OF USERS.
app.delete('/deletedata', async (req, res) => {
    deletedData = await database.ref('users').remove();
    console.log(deletedData);
    res.status(200).json({
        status: 'success',
        message: 'Data deleted successfully'
    })
})

app.delete('/deleteSingleData/:id', async (req, res) => {
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
    let id = req.params.id 

    let output = await database.ref(`users/${id}/`).update({nutrients:req.body.nutrients});
    res.status(200).json({
        status: 'success',
        output
    })
})
app.delete('/deleteUsingId/:id', async (req, res) => {
    try {
    let id = req.params.id;
    await database.ref(`users/${id}`).remove()
    res.status(204).json({
        status: 'success',
        data: {
            message: 'User deleted successfully',
        }
    })

    } catch {
        res.status(404).json({
            status: 'failure',
            data:{
                message: 'Invalid Input'
            }
        })
    }
})

app.delete('/deleteId', async (req, res) => {
    let id = req.query.id;
    let output = await database.ref('/users').once('value');
    let db_id = output.val().filter((item) => {
         let array_id = item._id
         return id !== array_id
    });
    console.log(db_id);
    let newData = await database.ref('/users').set(db_id);
    res.status(200).json({
        status: 'success',
        data: {
            newData
        }
    })
})

//set use pannanum...

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