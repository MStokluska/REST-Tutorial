const express = require('express');
const { users, tasks } = require('./db');
const cors = require('cors')

const app = express();

app.use(cors())

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

app.delete('/users/delete/:userName', (req, res) => {
    const indexOfUserToBeDeleted = users.findIndex(u => u.firstName === req.params.userName);
    users.splice(indexOfUserToBeDeleted, 1);
    res.json(users);
});

app.post('/users/addUser/:userId&:firstName&:lastName&:title&:email&:taskId', (req, res) => {
    const newUser = {
        userId: req.params.userId,
        firstName: req.params.firstName,
        lastName: req.params.lastName,
        title: req.params.title,
        email: req.params.email,
        taskId: req.params.taskId,
    };
    users.push(newUser);
    res.json(users);
})

const port = 4000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});