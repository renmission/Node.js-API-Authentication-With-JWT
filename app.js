const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();


app.get('/api', (req, res) => {
    res.json({
        message: 'welcome to the API'
    });
});


app.post('/api/posts', verifyToken, (req, res) => {
    //verify token
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: "Post created",
                authData
            });
        }
    });
});


app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'Ren',
        email: 'missionrenjr@gmail.com'
    }

    jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
        res.json({
            token
        });
    });
});


//FORMAT OF TOKEN
// Authorization: Bearere <access token>
// VerifyToken
function verifyToken(req, res, next) {
    //GET Auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // GET token by array
        const bearerToken = bearer[1];
        // SET the token
        req.token = bearerToken;

        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

app.listen(5000, () => { console.log('Server starts on port 5000') });
