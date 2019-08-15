const db = require(`../db`);


async function getAll(){
    try{
    // const allUsers = await db.any('select * from users')
    // return allUsers
    return await db.any('select * from users')
    }
    catch(error){
        console.log("There was an error retrieving all users")
        console.log(error);
        return [];
    }
};

async function getOne(id){
    try {
    const user = await db.one('select * from users WHERE id=$1', [id]);
    const todosForUser = await db.any('select * from todos where user_id=$1', [id]);
    user.todos = todosForUser;
    return user
    }
    catch(error){
        console.log("There was an error retrieving user")
        console.log(error)
        return{
            id: 0,
            displayname: 'No user found'
        };
    }
    };

// Accept an argument of an object. That way we have flexibility later on.
// That way we can add more database columns without having to update all
// of our function calls.

//Called below is the longhand version of the following shorthand, fully destructured version
//When called they only pass in an object,
//they don't have to know that they are destructuring
// async function createUser({displayname, username}){
//     db.one(
//         'INSERT INTO users (displayname,username) values ($1, $2)', 
//         [displayname, username]);
async function createUser(userDataObj){
    const {displayname, username} = userDataObj;
    const id = await db.one(`
        INSERT INTO users (displayname,username) values ($1, $2)
        
        returning id`

        ,[displayname, username]);
    console.log(id);
    return id;
}

module.exports = {
    getAll,
    getOne,
    createUser
}