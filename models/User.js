const db = require(`../db`);


function getAll(){
    return db.any(
        'select * from users')
    .catch((err)=>{
        console.log(`Error getting users.`);
        console.log(err)
    })
};

function getOne(id){
    return db.one(
        'select * from users WHERE id=$1', [id])
    .catch((err) =>{
        console.log(`Error getting one user.`)
        console.log(err)
    })
};

module.exports = {
    getAll,
    getOne
}