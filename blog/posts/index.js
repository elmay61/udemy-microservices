// express is a minimal and flexible Node.js web application framework

const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const app = express();

// resources stored in memory whiich means you need to reinitialize all the posts every time

const posts = {};
app.use(bodyParser.json());

// this is a route handler
// req is the request data and res is the response
app.get('/posts', (req,res) => {
    res.send(posts);
});

app.post('/posts', (req,res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
        id, title
    };
    res.status(201).send(posts[id]);
});

app.listen (4000, () => {
    console.log('Listening on 4000');
});