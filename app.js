const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

const users = fs.readFileSync('./users.json')
const usersData = JSON.parse(users);

app.get('/' , (req, res) => {
    res.send('Welcome to the Backend World....')
})

app.get('/users', (req, res) => {


    res.status(200).json({
        status: 'success',
        data: {
            usersData
        }
    });
})

app.get('/test' , (req, res) => {
    res.send('This is the test api....')
})

app.get('*', (req, res) => {
    res.status(404).json({
        status: 'failure', 
        data: {
            message: `You've entered the invalid path....`
        }     
    })
})

app.listen(port, () => {
    console.log(`Server is listening to the port ${port}....`);
})