const express = require('express');
const { users, tasks } = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/_ping', (req, res) => {
    res.send('pong');
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:userName', (req, res) => {
    res.send(users[users.findIndex(u => u.firstName === req.params.userName)]);
});

app.post('/users', (req, res) => {
    const user = req.body;
    console.log(req.body)
    users.push(user);
    res.json(users);
});

app.delete('/users/:userName', (req, res) => {
    const indexOfUserToBeDeleted = users.findIndex(u => u.firstName === req.params.userName);
    return res.json(users.splice(indexOfUserToBeDeleted, 1));
});

const port = 4000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});