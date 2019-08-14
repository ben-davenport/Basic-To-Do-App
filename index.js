const http = require('http');
const Todo = require(`./models/Todo`)



const server = http.createServer((req, res) => {
    console.log(`You've got a request`);
    const allTodos = Todo.getAll();
    allTodos
        .then((data) => {
        console.log('Here is the data:');
        console.log(data);
        res.end(JSON.stringify(data))
        })
});

server.listen(4000)
