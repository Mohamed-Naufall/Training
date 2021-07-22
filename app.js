const express = require('express');
const app = express();
const port = 8086;

app.get('/' , (req, res) => {
    res.send('Welcome to the Backend World....')
})

app.get('/test' , (req, res) => {
    res.send('Testing')
})

app.listen(port, () => {
    console.log(`Server is listening to the port ${port}....`);
})