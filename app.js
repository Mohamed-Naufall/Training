const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const tours = fs.readFileSync('./tours.json')
const toursData = JSON.parse(tours);

const users = fs.readFileSync('./users.json')
const usersData = JSON.parse(users);

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