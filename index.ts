import express from 'express'
import { users, tasks } from './db'

const app = express()

app.get('/_ping', (req, res) => {
  res.send('pong')
})
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/users/:userId', (req, res) => {
  return res.send(users[users.findIndex(u => u.firstName === req.params.userId)]);
});

app.delete('/users/delete/:userId', (req, res) => {
  const indexOfUserToBeDeleted = users.findIndex(u => u.firstName === req.params.userId);
  return res.json(users.splice(indexOfUserToBeDeleted));
});

app.get('/users', (req, res) => {
  res.json(users);
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})