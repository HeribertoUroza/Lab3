const express = require('express');
const bcrypt = require('bcrypt')
const uuidv1 = require('uuid/v1');

const { createUser,readUser,updateUser,deleteUser} = require('../services/user')
const userRoute = express.Router();


userRoute.post('/', (req, res) => {
    console.log(req.body)
    const { username, email, password } = req.body;
    console.log(1)
    bcrypt.hash(password, 10)
        .then((encryptedPassword) => {
            console.log(2)
            const newUser = {
                username: username,
                email: email,
                password: encryptedPassword,
                
            }
            console.log(3)
            console.log(newUser.username, newUser.email, newUser.password)

            createUser(newUser.username, newUser.email, newUser.password)
            .then(data => {
                res.json({
                    message: 'User Created'
                })
            }).catch(err=> {
                res.json(err.toString())
            })
        })
        .catch(err => {
            console.log(6)
            res.status(400).json({ error: 'Something went wrong' });
            console.log(7)
        })
});



userRoute.post('/login', (req, res) => {
    const { username, password } = req.body;

    readUser(username)
        .then(user => {

            if (!user) {
                throw new Error(`Username ${username} does not exist.`)
            }

            return { match: bcrypt.compare(password, user.password), user: user }
        })
        .then(result => {
            if (!result.match) throw new Error(`The password didn't match.`)

            const token = uuidv1();
            const newUser = result.user;
            newUser.token = token;

            updateUser(username, newUser.token);

            res.json({
                status: 'Successful',
                token: token
            });
        })
        .catch(err => {
            res.status(400).json({ error: err.toString() })
    })
});

module.exports = {
    userRoute: userRoute,
}

/*
C => Create => POST —> for when there’s large data
R => Read => GET —> stick to smaller data
U => Update => PUT/PATCH
	-PUT change the entire thing
	-PATCH change 1 or a few things
D => Delete => DELETE
*/

