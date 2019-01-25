//User Service
const { db } = require('./db')


//Create a User

const createUser = (username, email, password) => {
    console.log("did you make it")
    console.log(username, email, password)
    return db.none('INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password})', { username: username, email: email, password: password })
}

const readUser = (username) => {
    return db.any('SELECT * FROM users WHERE username=${username}', { username: username }) //this will be taking your SQL commands
}

//
const updateUser = (username, token) => {
    return db.none('UPDATE users SET token=${token} WHERE username=${username}', {  username, token });
}

const deleteUser = (id) => {
    return db.none('DELETE FROM pets WHERE owner=${id}; DELETE FROM users WHERE id=${id}', { id });
}

module.exports = {
    createUser,
    readUser,
    updateUser,
    deleteUser
}