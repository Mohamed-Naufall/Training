const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/' , (req, res) => {
    res.send('Welcome to the Backend World....')
})

app.get('/test' , (req, res) => {
    res.send('This is the test api....')
})

app.listen(port, () => {
    console.log(`Server is listening to the port ${port}....`);
})