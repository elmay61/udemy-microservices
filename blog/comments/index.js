// express is a minimal and flexible Node.js web application framework

const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');

const app = express(); //creates the express application

// resources stored in memory whiich means you need to reinitialize all the posts every time

const commentsByPostId = {};
app.use(bodyParser.json());

// this is a route handler
// req is the request data and res is the response
app.get('/posts/:id/comments', (req,res) => {
    res.send(commentsByPostId[req.params.id]) || [];
});

app.post('/posts/:id/comments', (req,res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    // see if there was already a comment for this post and get it. if there was no comment, get an empty array
    const comments = commentsByPostId[req.params.id] || []
    comments.push ({ id: commentId, content});
    commentsByPostId[req.params.id] = comments;
    res.status(201).send(comments);
});

app.listen (4001, () => {
    console.log('Listening on 4001');
});