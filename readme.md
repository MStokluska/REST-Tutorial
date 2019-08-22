

----
<center>REST</center>
----

On a very high level, REST or REpresentational State Transfer is an architectural style that separates the client and a server. A client sends requests to /server and server responds while their concerns are separated, which means, a client has no idea how a server works, all it needs to know is that under given URL certain data is accessed. Server, on the other hand, does not care how many clients, or what clients are going to request the data from it! The client uses [HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) to access the server, some of which are: GET, POST, PUT, DELETE and PATCH.


In tutorial bellow will give you glipse on how to build typical REST API. We will do that by writing simple Node.js server! Let's give it a go! 
Finished version of tutorial can be found in[my github repo](https://github.com/MStokluska/REST-Tutorial).

## Requirements

- Node.js installed
- Visual Studio or other editor

## REST In 5 minutes

- Open your Visual Studio Code (VSC) and hit  ctrl + &#96;  to open up the console
- Create a folder called `server` and navigate to it
- Type in your console:  `npm init` - this will envoke yarn package creator
- Add `index.js` file and write the following code in:

```js
console.log("hello world")
```

- In your package.json add:
```js
 "scripts": {
    "start": "node index.js"
  }
```

So it looks like this:

```js
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
- In your command line type
```
[@localhost server]$ yarn start
```
And you should see the "hello world" output in your console! Yarn looks through scripts specified in package.json and executes them. Package.json can contain a lot of settings and scripts for your projects, for example, license - MIT means it is "free software" and anyone can use it, there's a lot of useful stuff you can learn about package.json but let's not go into it now;) Without our "start" script we would have to execute:
```
[@localhost server]$ node index.js
```
If you are interested you can find more information about scripts [here](https://docs.npmjs.com/misc/scripts).

In our server, we are going to use TypeScript, feel free to use javascript if that's what you prefer, but I highly recommend following me and using TypeScript instead. TypeScript is a language that has a strict syntactical superset of JavaScript and adds optional static typing to the language. To me, TypeScript is just simpler Javascript and I love it!

- Let's add typescript to our project along with node support for typescript:
```
[@localhost server]$ yarn add typescript ts-node @types/node
```
Remember when I mentioned about package manager is responsible for managing dependencies? This is exactly what we did just now! We have added new dependencies to our project, which is support for typescript and interpreter that will transpile required .ts files into JavaScript at runtime.
- Next, change the extension of your index.js file to index.ts file so it becomes a typescript file! What's happening next is during compiling .ts file gets converted automatically by a node to a .js file!

- Let's configure few bits and pieces in our Typescript, let's not worry about it too much as this is not meant to be a typescript tutorial, create a new file ``tsconfig.json`` and paste following code:

```js
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "lib": [
      "es2018",
      "esnext.asynciterable"
    ],
    "skipLibCheck": true,
    "strict": true,
    "strictFunctionTypes": false,
    "strictPropertyInitialization": false,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

- Once we have changed our .js file into .ts file and have our typescript configured, we have to edit our "start" script from package.json as file index.js is no longer available and we no longer going to use node to start it, instead we are going to use ts-node.
So lets change our start script to:
```js
"start": "ts-node index.ts"
```
- We are going to use Express which is a wrapper around the native Node.JS HTTP library which is responsible for handling HTTP requests. So let's add express dependencies to our project along with typescript support of express by:
```
[@localhost server]$ yarn add express
[@localhost server]$ yarn add --dev @types/express
```
- Once that's done, we can finally start up our very first express server!
Edit your index.ts to look like this:

```js
import express from 'express'

const app = express()

app.get('/_ping', (req, res) => {
  res.send('pong')
})

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
```
-import express from 'express' - we are simply importing express from express dependencies that we have downloaded
-const app = express() - we are creating an express app
-app.get('/_ping') - our app is accessible on that address
-(req, res) - our app can accept requests and send responses
-res.send('pong') - once our app is accessed on '/_ping' let's send "pong" back to the client!
-const port - setting up a port variable to 4000 or one specified by the environment variable ( let's not worry about it for now )
-app.listen(port...) - using the set variable to enable server to listen for requests on given port

To summarize, we have set up a node.js server that is using express. Our server listens on localhost:4000/_ping.

- In your console type in:
```
[@localhost server]$ yarn start
```
- Open your browser and go to ``http://localhost:4000/_ping`` and enjoy the power of express! Pong should be visible in your browser! ...or if you want to stick to console type:
```
[@localhost server]$ curl localhost:4000/_ping
```
- Our next step is to add some kind of data, for this purpose lets mock a database connection, in a typical situation our server would communicate with a database like postgres, mysql or mongo, but for the purpose of this tutorial, let's use a mock database. Create ``db.ts`` file.

```js
export const users = [
  {
    id: '1',
    firstName: 'Michael',
    lastName: 'Stone',
    title: 'Mr',
    email: 'michael@example.com',
    taskId: '20',
  },
  {
    id: '2',
    firstName: 'John',
    lastName: 'Barry',
    title: 'Mr',
    email: 'john@example.com',
    taskId: '21',
  },
  {
    id: '3',
    firstName: 'Mary',
    lastName: 'Savage',
    title: 'Mrs',
    email: 'mary@example.com',
    taskId: '22',
  },
];

export const tasks = [
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
```
Our database is very simple, it contains of few users and few tasks, each person has an assigned task and each task is assigned to a certain user.

- As we don't want to be sending pong only anymore to our client but the actual data, add the following lines to our index:
```js
import { chats, tasks } from './db';
```
- Which allows us to access tasks and users objects from db file, and also, add other routes to our index:
```js
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/users', (req, res) => {
res.json(users);
})
```
- After adding new routes, start your server and visit localhost:4000/users or localhost:4000/tasks from your browser! Or simply,
in your console type:
```
[@localhost server]$ curl localhost:4000/users
[@localhost server]$ curl localhost:4000/tasks
```
- Let's imagine we would like to pull users details providing name, we can do it by passing in params, let's assume we know the first names of our users and this is how we would like to find them. Add the following GET method to our index.ts:
```js
app.get('/users/:userId', (req, res) => {
    return res.send(users[users.findIndex(u => u.firstName === req.params.userId)]);
  });
```
and give it a try by using curl or visiting localhost:4000/users/Michael.
```
[@localhost server]$ curl localhost:4000/users/Michael
```
In your response you should have got details concerning Michael only, however, as this GET request takes in PARAM, you can just change the URL to any other name that is in our database to pull the record of the required user! Give it a try yourself! Try this in your command line:
```
[@localhost server]$ curl localhost:4000/users/John
```
- See how cool REST can be?! Now, let's go through one more HTTP method - DELETE! To do that I need you to install either POSTMAN or just an addon to Chrome - Advanced REST Client. Next, add another method to our server:
```js
app.delete('/users/delete/:userId', (req, res) => {
    const indexOfUserToBeDeleted = users.findIndex(u => u.firstName === req.params.userId);
    return res.json(users.splice(indexOfUserToBeDeleted));
  });
``` 
- Open you Advanced REST Client and make sure you got the following set up:

![REST Client Delete setup](https://thepracticaldev.s3.amazonaws.com/i/gfovraize65jxg9cyasq.png)

Hit send and you should get a response with 2 users left only. And you will as long as you won't restart the server. Remember we don't use an actual database but a mock of a database for now so changes are temporary.

- Our server accepts only requests from localhost, which even although it is a very simple server, makes it unusable to anyone except ourselves. To change it and allow requests from other sources we need to enable CORS support. You can read more about CORS [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). To do that, first, add dependencies to our project:
```
[@localhost server]$ yarn add cors
[@localhost server]$ yarn add --dev @types/cors
```
and add the following lines to our index.ts
```js
import cors from 'cors';     <---------------------------------
import express from 'express';
import { tasks, users } from './db';
const app = express();
app.use(cors());             <---------------------------------
app.get('/_ping', (req, res) => {
  res.send('pong');
});
```
Your index.ts should look like this:
```js
import express from 'express';
import { users, tasks } from './db';

const app = express();

app.get('/_ping', (req, res) => {
  return res.send('pong');
});

app.get('/tasks', (req, res) => {
  return res.json(tasks);
});

app.get('/users/:userId', (req, res) => {
  return res.send(users[users.findIndex(u => u.firstName === req.params.userId)]);
});

app.delete('/users/delete/:userId', (req, res) => {
  const indexOfUserToBeDeleted = users.findIndex(u => u.firstName === req.params.userId);
  return res.json(users.splice(indexOfUserToBeDeleted));
});

app.get('/users', (req, res) => {
  return res.json(users);
});

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
```
There you go! Your very first, very simple also, server with REST endpoints! It is very easy, there's a lot more you can do with REST, but I guess my target here was to give you a brief idea of what REST is. As you have seen using REST endpoints (.../tasks, .../users, .../users/delete/, etc.) allows also to send in parameters, which would be handy if we would like to delete a certain task, update or add new task or user but I leave it up to you to investigate further! This is similar to what I was exposed to on my adventure to become a software developer, which is still ongoing;) but it was also a huge eye-opener as for understanding client-server architecture! However, as I'm sure you can imagine now, you need to expose a different endpoint for each data you want to send, our project has only 2 entities, users and tasks, and it's very plain and simple - imagine how complex REST could be if you add another 10, 20 or more entities which can somehow interact with each other! Imagine that everything we did so far would need to be accessing the database through, for example, SQL statements, that would need to be placed in a different layer of our server to hide business logic! Imagine writing all those REST endpoints for your "dream" application! 


Let's now head straight into graphQL!
