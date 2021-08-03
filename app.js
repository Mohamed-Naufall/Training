const express = require('express');
const app = express();
const firebase = require('firebase');
const axios = require('axios');
const request = require('request');
const firebase_config = require('./firebase/firebaseConnect');
const { response } = require('express');
var database = firebase.database();
var _ = require('lodash');


app.use(express.json());
const apiKey = '0E2E8p9Z7X'
const port = process.env.PORT || 3001;

const users = (req, res) => {
    var firebaseRef = firebase.database().ref('users')
    firebaseRef.once('value', function(snapshot) {
        let showData = snapshot.val();
        if (showData) {
            res.status(200).json({
                status: 'success',
                data: {
                    showData
                }
            })
        } else {
            res.status(501).json({
                status: 'failure',
                data: {},
                message: 'There is no data..'
            })
        }

    })
}

const getById = (req, res) => {
    try {
        let id = req.params.id
        var firebaseRef = firebase.database().ref(`users/${id}`);
        firebaseRef.once('value', function(snapshot) {
            let items = snapshot.val();
            res.status(200).json({
                staus: 'success',
                data: {
                    items
                }
            })
        })
    } catch {
        res.status(404).json({
            status: 'failure',
            data: {
                message: 'There is no data'
            }
        })
    }

}

const searchaniseDataa = (req, res) => {
    let q = req.query.q;
    let sortBy = req.query.sortBy;
    let sortOrder = req.query.sortOrder;
    let handle = req.query.handle;
    let suggestions = req.query.suggestions;
    let searchaniseUrl = `https://www.searchanise.com/getwidgets?apiKey=${apiKey}`;
    try {
        if (q == '') {
            return res.status(404).json({
                status: 'failure',
                message: 'Necessary Parameter missing'
            })
        }

        if (q && sortBy == '') {
            return res.status(404).json({
                status: 'failure',
                message: `Sort value is not passed as it's mandatory`
            })
        }
        if (q) {
            searchaniseUrl = searchaniseUrl + `&q=${q}`;
        }

        if (handle) {
            searchaniseUrl = searchaniseUrl + `&handle=${handle}`;

        }

        if (sortBy) {
            if (sortBy === "titlea") {
                searchaniseUrl = searchaniseUrl + `&sortBy=titleasc`;
            } else if (sortBy === "titleb") {
                searchaniseUrl = searchaniseUrl + `&sortBy=titledesc`;
            } else if (sortBy === "pricea") {
                searchaniseUrl = searchaniseUrl + `&sortBy=priceasc`;
            } else if (sortBy === "priceb") {
                searchaniseUrl = searchaniseUrl + `&sortBy=pricedesc`;
            } else if (sortBy === "relevance") {
                searchaniseUrl = searchaniseUrl + `&sortBy=relevance`;
            } else {
                return res.status(404).json({
                    status: 'failure',
                    message: 'Wrong sort parameter'
                })
            }
        }

        if (sortOrder) {
            if (sortOrder == 'asc') {
                searchaniseUrl = searchaniseUrl + `&sortOrder=asc`
            } else if (sortOrder == 'desc') {
                searchaniseUrl = searchaniseUrl + `&sortOrder=desc`
            } else {
                return res.status(404).json({
                    status: 'failure',
                    message: 'Wrong sort parameter'
                })
            }
        }

        if (suggestions) {
            if (suggestions == 'true') {
                searchaniseUrl = searchaniseUrl + `&suggestions=${true}`
            } else if (suggestions == 'false') {
                searchaniseUrl = searchaniseUrl + `&suggestions=${false}`
            } else {
                return res.status(404).json({
                    status: 'failure',
                    message: 'Something went wrong while selecting suggestions yes/no'
                })
            }
        }

        axios({
                url: searchaniseUrl
            }).then(output => {
                res.send(searchaniseUrl);
                return;
            })
            .catch(err => {
                console.log(err)
            })
    } catch {
        res.send('Some Necessary parameter is missing')
    }
}

const searchaniseData = (req, res) => {
    axios.get(`https://www.searchanise.com/getwidgets?apiKey=${apiKey}`)
        .then(output => res.send(output.data))
        .catch(err => console.log(err))
}

const getByArray = (req, res) => {
    try {
        let id = req.params.id
        var firebaseRef = database.ref('users');
        firebaseRef.once('value', function(snapshot) {
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
    } catch {
        res.status(404).json({
            status: 'failure',
            data: {
                message: 'There is no data'
            }
        })
    }

}

const postData = async(req, res) => {
    const customer_data = (req.body);
    let data = await database.ref('/users').push(customer_data);
    res.status(200).json({
        status: 'success',
        data: data
    })

}
const deleteData = async(req, res) => {
    try {
        deletedData = await database.ref('users').remove();
        console.log(deletedData);
        res.status(200).json({
            status: 'success',
            message: 'Data deleted successfully'
        })
    } catch {
        res.status(404).json({
            status: 'failure',
            message: 'Something went wrong...'
        })
    }
}

const updateId = async(req, res) => {
    let id = req.params.id
    let output = await database.ref(`users/${id}/`).update({ nutrients: req.body.nutrients });
    res.status(200).json({
        status: 'success',
        output
    })
}
const deleteUsingId = async(req, res) => {
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
            data: {
                message: 'Invalid Input'
            }
        })
    }
}

const deleteId = async(req, res) => {
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
}

const wrongRoutes = (req, res) => {
    res.status(404).json({
        status: 'failure',
        data: {},
        message: `You've entered the wrong path...`
    })
}

const searchaniseDatawithQueryString = (req, res) => {
    axios.get(`https://www.searchanise.com/getwidgets?apiKey=${apiKey}`)
        .then(output => {
            const queryData = output.data
            let itemss = queryData.items

            itemss.forEach(element => {

                console.log(element);
            });

        })

    .catch(err => console.log(err))
}

const home = (req, res) => {
    res.status(200).send(
        `<h1>Hello, Welcome to the homepage, Please use the correct path to navigate to the respective pages</h1> <br> Following 
are the respective paths.<br><br>
/api/users<br>
/api/getbyID/:id<br>
/api/searchanniseData<br>
/api/searchanniseDataa<br>
/api/getbyArray/:id<br>
/api/postdata<br>
/api/deletedata<br>
/api/update/:id 
<br> /api/deleteUsingId/:id <br> /api/deleteId <br> /api/searchanniseDataWithQueryString<br>`)
}
app.get('/', home)
app.get('/api/users', users)
app.get('/api/getbyID/:id', getById)
app.get('/api/searchanniseData', searchaniseData)
app.get('/api/searchanniseDataa', searchaniseDataa)
app.get('/api/getbyArray/:id', getByArray)
app.post('/api/postdata', postData)
app.delete('/api/deletedata', deleteData)
app.put('/api/update/:id', updateId)
app.delete('/api/deleteUsingId/:id', deleteUsingId)
app.delete('/api/deleteId', deleteId)
app.get('/api/searchanniseDataWithQueryString', searchaniseDatawithQueryString)
app.get('*', wrongRoutes)


app.listen(port, () => {
    console.log(`Server is listening to the port ${port}....`);
})