
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

module.exports.users = users;
module.exports.tasks = tasks;
