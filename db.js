// Import the dotenv module
//call the config method
require('dotenv').config();

const pgp = require('pg-promise')({
    query:(e)=>console.log(e.query)
})
// const Todo = require('./models/Todo');

const db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

console.log('Yay you did it');
// console.log(db);


module.exports = db;