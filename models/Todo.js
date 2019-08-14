const db = require(`../db`)

function getAll(){
    return db.any(`SELECT * FROM todos;`)
    // .then((data) => {
    //     console.log('here is the data:');
    //     console.log(data);
    //     })
    .catch((err) => {
        console.log(`uh oh`)
        console.log(err)
    })
}

//When you want one and ony one, use the ".one()" method instead of .any()
//That way when you don't find it, the .catch is triggered. 
//This is better than doing an if-else inside of the .then()
function getOne(id){
    db.one(`SELECT * FROM todos WHERE id=$1;`, [id])
        .then((data) => {
            // console.log('here is the data:');
            // console.log(data);
        })
        .catch((err) => {
            console.log(`uh oh`)
            console.log(err)
        })
}

module.exports = {
    //if you omit the colon and the repeated word, it assumes the same name
    //e.g. getAll: getAll, getOne: getOne is the same as below;
    //This is called enhanced object literal syntax.
    getAll,
    getOne,
}
