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

module.exports = {
    getAll,
    getOne
}