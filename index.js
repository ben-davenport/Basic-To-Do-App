// const http = require('http');
//replace http with express
const express = require('express');
const Todo = require(`./models/Todo`)
const User = require(`./models/User`)

//Create the server and call it "app"
const app = express();
//create a variable for the port #
const port = 4000;



// const server = http.createServer((req, res) => {
    //replace with app.get()
app.get(`/todos`,(req, res) => {
    console.log(`You've got a request`);
    const allTodos = Todo.getAll();
    allTodos
        .then((data) => {
        console.log('Here is the data:');
        console.log(data);
        // res.end(JSON.stringify(data))
        res.json(data);
        })
});

app.get(`/todos/:taskId`,(req,res) => {    
    console.log("You asked for a specific task");
    console.log(req.params.taskId);
    //convert the route paramter to a number and make sure that it's in base 10
    const theId = parseInt(req.params.taskId, 10);
    const oneTodo = Todo.getOne(theId);
        oneTodo
        .then((data) => {
        // console.log(data);
        // res.end(JSON.stringify(data))
        res.json(data);
        })
});

app.get(`/users`,(req,res)=>{
    const allUsers = User.getAll();
    allUsers
        .then((data) => {
            res.json(data)
        });
});
app.get(`/users/:userId`, (req,res)=>{
    const theId = parseInt(req.params.userId, 10);
    const aUser = User.getOne(theId);
    aUser
        .then((data)=>{
            res.json(data);
        })
})

app.listen(port)
