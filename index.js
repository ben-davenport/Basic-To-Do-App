// const http = require('http');
//replace http with express
const express = require('express');
const Todo = require(`./models/Todo`);
const User = require(`./models/User`);
const { sanitizeBody } = require('express-validator');
const es6Renderer = require('express-es6-template-engine');

//Create the server and call it "app"
const app = express();
app.engine('html', es6Renderer);
app.set('views', 'views')
app.set('view engine', 'html')
//All static assets go into the public folder.
app.use(express.static('public'))


//use the urlencoded middleware
//to read POST bodies
app.use(express.urlencoded({extended: true}));

//create a variable for the port #
const port = 4000;



// const server = http.createServer((req, res) => {
    //replace with app.get()
app.get('/', (req, res) => {
    res.render('index', {
        locals: {
            message: "It is time for lunch"
        },
        partials: {
            navbar: './navbar',
            includes: 'includes'
        }
    
    }); 
});

app.get('/profile', (req, res) => {
    res.render('profile', {
        locals: {
            message: "This is a profile"
        },
        partials: {
            navbar: './navbar',
            includes: 'includes'
        }
    
    }); 
});

app.get('/profile/todos', async (req, res) => {
    const userId = 1; //using hard coded id for now
    const theUser = await User.getOne(userId)
    //normally you would grab the UserId from the Server or from the URL
    res.render('todo', {
        locals: {
            message: "This is a to-do list",
            todos: theUser.todos
        },
        partials: {
            navbar: './navbar',
            includes: 'includes'
        }
    
    }); 
});

///1. Allow the user to get the form for creating a todo
app.get('/profile/todos/create',(req, res) => {
    //render the "create new todo" form template
    res.render('create-todo', {
        partials: {
            navbar: './navbar',
            includes: 'includes'
        }
    })
});

///2. Process the body of the form they POST
app.post('/profile/todos/create', [sanitizeBody('task').escape(), sanitizeBody('user_id').escape()], async (req,res) => {
    console.log(req.body)
    //handle the req.body from the crate new todo form 
    const taskId = await Todo.createTodo(req.body, req.body.user_id)
    res.send(taskId);
});

app.get(`/todos`,async (req, res) => {
    console.log(`You've got a request`);
    const allTodos = await Todo.getAll();
    res.json(allTodos);
    // allTodos
    //     .then((data) => {
    //     console.log('Here is the data:');
    //     console.log(data);
    //     // res.end(JSON.stringify(data))
    //     res.json(data);
    //     })
});

app.get(`/todos/:taskId`, async (req,res) => {    
    console.log("You asked for a specific task");
    console.log(req.params.taskId);
    //convert the route paramter to a number and make sure that it's in base 10
    const theId = parseInt(req.params.taskId, 10);
    const oneTodo = await Todo.getOne(theId);
    res.json(oneTodo);
        // oneTodo
        // .then((data) => {
        // // console.log(data);
        // // res.end(JSON.stringify(data))
        // res.json(data);
        // })
});

app.get(`/users`, async (req,res)=>{
    const allUsers = await User.getAll();
    res.json(allUsers);
    // allUsers
    //     .then((data) => {
    //         res.json(data)
    //     });
});
app.get(`/users/:userId`, async (req,res)=>{
    const theId = parseInt(req.params.userId, 10);
    const aUser = await User.getOne(theId);
    res.json(aUser);
    // aUser
    //     .then((data)=>{
    //         res.json(data);
    //     })
})

// User.createUser({
//     displayname: "whowho",
//     username: "who2who2"
// })

app.post(`/users`, [sanitizeBody('username').escape(), sanitizeBody('displayname').escape()] ,async (req, res) => {
    console.log("We got a post request!");
    // res.send("good job")
    console.log('Here is the body:');
    console.log(req.body)
    // const newUserInfo = await User.createUser({
    //     displayname: req.body.displayname,
    //     username: req.body.username
    // });
    const newUserInfo = await User.createUser(req.body);
    res.json(newUserInfo)
})

app.post(`/user/:userId/todos`, async (req, res) => {
    const theId = parseInt(req.params.userId, 10)
    console.log("Task's post request sent!");
    console.log('Here is the body:');
    console.log(req.body)
    const newTask = await Todo.createTodo(req.body, theId);
    res.json(newTask)
})

app.listen(port)
