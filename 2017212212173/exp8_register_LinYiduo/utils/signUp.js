const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./utils/users.json');
const db = low(adapter);

function signUp(email, password){
    
    // let str = db.get('users').value();
    // console.log(str[0]);

    db.get('users').push({
        email : email,
        password : password
    }).write();
}

module.exports = { signUp };