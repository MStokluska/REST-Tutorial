Link to dev.to(unpublished): https://dev.to/mstokluska/rest-4559-temp-slug-1084036?preview=499edc364810a5d0d706a9427deaf0d51e9edc299c1356589b1740a15199a655106aa2dd7174005c025caedbf6511c5deeba9d52bb6628ad22e8f5ef

----
# <center>REST in 10 minutes!</center>
----

On a very high level, REST or Representational State Transfer is an architectural style that separates the client and a server. A client sends requests to a server, and the server responds while their concerns are separated, which means a client has no idea how a server works, all it needs to know is that from a given URL, certain data is accessed.

The server, on the other hand, does not care how many clients are going to request the data from it. 

The client uses [HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) to access the server, the most common of which are: GET, POST, PUT, DELETE and PATCH.

The tutorial below will give you a glimpse of how to build a typical REST API. We will do that by writing a simple Node.js server with Express. Let's give it a go! You can find a finished version of the tutorial in my [Github repo](https://github.com/MStokluska/REST-Tutorial).

## Requirements

- Node.js installed
- Visual Studio Code

## Let's get started

- Open your Visual Studio Code (VSC) and hit ``ctrl + (back tick `)`` to open up the terminal
- Create a folder called `server` and navigate to it
- Type the following into the terminal:

```sh
$ npm init
```

This will start the npm package creator, feel free to fill in some details if you want or you can just leave it empty by hitting "Enter" few times!

Add an `index.js` file and enter the following code:


```js
console.log("hello world")
```

`Note`: Don't foget to save your work in Visual Studio Code after each code input by clicking `ctrl + s`

In your `package.json` file add a start script and if there is an echo script, you can delete it:

```json
 "scripts": {
    "start": "node index.js"
  }
```

It should look like this:

```json
{
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "start": "node index.js"
  }
}
```

In the terminal type:

```sh
$ npm start
```

You should see the "hello world" output in the terminal! Npm looks through scripts specified in package.json and executes them. Package.json can contain a lot of settings and scripts for your projects, for example, license - MIT means it is a "free software" and anyone can use it. There's a lot of useful stuff you can learn about package.json but let's not go into that now;) Without our "start" script we would have to execute:

```sh
$ node index.js
```

If you are interested you can find more information about scripts [here](https://docs.npmjs.com/misc/scripts).

Next, we are going to use Express which is a wrapper around the native Node.JS HTTP library and is responsible for handling HTTP requests. So let's add express dependencies to our project:

```sh
$ npm install express
```

What this command does is simply add express to our dependencies. One of the reasons we need express installed is because it allows us to use GET, POST, PUT, DELETE and other HTTP methods in a very easy way!

Once that's done, we can finally start up our very first express server! Edit your index.js to look like this:

```js
const express = require('express');

const app = express();

app.get('/_ping', (req, res) => {
  res.send('pong');
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
```

- `const express = require('express')` - we are simply importing express from express dependencies that we have downloaded
- `const app = express()` - we are creating an express app
- `app.get('/_ping')` - this is our very first used HTTP method - GET - which simply expects to GET something once the server is accessed from given URL
- `res.send('pong')` - once our app is accessed on '/_ping' let's send "pong" back to the client!
- `const port` - setting up a port variable to 4000
- `app.listen(port...)` - using the set variable to enable the server to listen for requests on a given port

To summarize, we have set up a Node.js server that is using express. Our server listens on `localhost:4000`, accepts requests from `/_ping` and responds with pong.

To test it, in your terminal run:

```sh
$ npm start
```

Next, open your browser, go to `http://localhost:4000/_ping` and enjoy the power of Node.js and express! Pong should be displayed in your browser. If you want to stay in the terminal:

```sh
$ curl localhost:4000/_ping
```
`Note`: To use `curl` start up the server as mentioned above, open another terminal window and then run your `curl` commands in this window. 

Our next step is to add some kind of data. For this purpose, lets mock a database connection. In a typical situation our server would communicate with a database like Postgres, MySQL or Mongo, but for the purpose of this tutorial, let's use a mock database. Create a `db.js` file and copy following code:

```js
const users = [
    {
      id: '1',
      firstName: 'Michael',
      lastName: 'Stone',
      title: 'Mr',
      email: 'michael@example.com',
    },
    {
      id: '2',
      firstName: 'John',
      lastName: 'Barry',
      title: 'Mr',
      email: 'john@example.com',
    },
    {
      id: '3',
      firstName: 'Mary',
      lastName: 'Savage',
      title: 'Mrs',
      email: 'mary@example.com',
    },
  ];
  
  const tasks = [
    {
      id: '20',
      title: 'Restocking',
      description: 'please restock soft drinks section',
      status: 'to be completed',
      assignedTo: '1',
    },
    {
      id: '21',
      title: 'Cleaning',
      description: 'please clean your desk!',
      status: 'to be completed',
      assignedTo: '2',
    },
    {
      id: '22',
      title: 'Documentation update',
      description: 'please update our customers details',
      status: 'to be completed',
      assignedTo: '3',
    },
  ];
  
  module.exports = { users, tasks };
```

This is a very simple database with only a few users and tasks and each task is assigned to a certain user.

As we want to send the actual data to our client now and not just "pong", add the following lines to our `index.js`:

```js
const { users, tasks } = require('./db');
```

- This allows us to access tasks and users objects from db file, and also, add other routes to our `index.js`:

```js
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.get('/users', (req, res) => {
    res.json(users);
});
```

After adding new routes and restarting the server, `ctrl + c` to stop current connection and then `npm start` to restart, visit localhost:4000/users or localhost:4000/tasks from your browser! Or in the terminal simply type:

```
$ curl localhost:4000/users
```

```
$ curl localhost:4000/tasks
```

Let's imagine we would like to get a specific user by their name. We can do this by passing in parameters. Let's assume we know the first names of our users and this is how we would like to find them. Add the following GET method to our `index.js`:

```js
app.get('/users/:userName', (req, res) => {
    res.send(users[users.findIndex(u => u.firstName === req.params.userName)]);
  });
```

Restart the server and give it a try by using curl or visiting `localhost:4000/users/Michael`.

```
$ curl localhost:4000/users/Michael
```

In your response you should have received details concerning Michael only. As this GET request takes in a parameter, you can just change the URL to any other name that is in our database to pull the record of the required user! Try this in your command line:

```
$ curl localhost:4000/users/John
```

Now, let's go through another HTTP method - DELETE! To do that add another method to `index.js`:

```js
app.delete('/users/:userName', (req, res) => {
    const indexOfUserToBeDeleted = users.findIndex(u => u.firstName === req.params.userName);
    users.splice(indexOfUserToBeDeleted, 1);
    res.json(users);
});
```

Restart your server and in the terminal type:

```sh
$ curl -X "DELETE" localhost:4000/users/Michael
```

With DELETE and a very short JavaScript code we are able to delete an item from our array of users!

One last method I would like to go through is POST. POST can be used to input a new object into our array or update the existing one. Let's use it to add a new user object to our users array!

Add a POST method to `index.js`:

```js
app.post('/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.json(users);
});
```
- Before we can use the POST method in our API we need to add a JSON body parser to our express app, as the POST methods will contain JSON objects that need to be accessed. To do this install:
```sh
$ npm install body-parser
```
- Then we have to add body parser to our app in `index.js` :
```js
const express = require('express');
const { users, tasks } = require('./db');
const bodyParser = require('body-parser'); <------------------

const app = express();

app.use(bodyParser.json());               <-------------------
...
```
- Restart the server and run the following curl command:

```sh
$ curl -d '{"id":"4", "firstName":"Anne", "lastName":"OBrien", "title":"Ms", "email":"anne@example.com"}' -H "Content-Type: application/json" -X POST http://localhost:4000/users
```

You should see our newly added user in the response.

Your `index.js` should look like this:

```js
const express = require('express');
const { users, tasks } = require('./db');
const bodyParser = require('body-parser');

const app = express();
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
    users.push(user);
    res.json(users);
});

app.delete('/users/:userName', (req, res) => {
    const indexOfUserToBeDeleted = users.findIndex(u => u.firstName === req.params.userName);
    return res.json(users.splice(indexOfUserToBeDeleted, 1));
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
```

## Summary

There you go! Your very first Node.js server that uses Express with REST endpoints. It is very easy and there's a lot more you can do with REST, but my target here was to give you a basic understanding of REST. What you just completed is similar to what I was exposed to in the beginning of my adventure in becoming a Software Developer, which is still ongoing 😉

It was also a huge eye-opener for me to help me understand client-server architecture! However,as I'm sure you can imagine, you need to expose a different endpoint for each data you want to send. Our project has only 2 entities, users and tasks, which is plain and simple but imagine how complex REST could be if you add another 10, 20 or even more entities which need to somehow interact with each other!

Imagine that everything we did so far would need to be accessing the database through, for example, SQL statements. These statements would need to be placed in a different layer of our server to hide business logic! Imagine writing all those REST endpoints for your "dream" application! Not that easy anymore, is it?!

In my next post, let's learn about [GraphQL!](https://dev.to/mstokluska/technologies-that-changed-my-perception-of-software-development-514o-temp-slug-9091855?preview=b2b0b8ac7f06850f80c48acef4b4ecabbcc4bc9e17ac24aaee54a92d445a726b93f98d34d347f67c5d3790bb21672185625b38f389f912606739cfdf)!
