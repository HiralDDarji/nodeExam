const User = require('../models/user');

const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');

// Register User
exports.registerUser = (req, res) => {
    let username = req.body.name;
    let password = req.body.password;
    let email = req.body.email;
    User.findAll({where: {email: email}})
    .then((user) => {
        // if User is available with same email > do not sign up again
        if (user.length > 0) {
            return res.status(403).json({message: 'User is already available with this email'})
        } else {
            bcryptjs.hash(password, 10)
            .then((encryptedPass) => {
                User.create({
                    username: username,
                    email: email,
                    password: encryptedPass
                })
                .then((user) => {
                    return res.status(201).json({message: 'You have signed up sucessfully!'})
                })
                .catch((error) => {
                    return res.status(500).json({message: `Could not sign up due to some error ${error}`});
                })
            })
            .catch((err) => {
                return res.status(500).json({message: `Failed to encrypt password ${err}`});
            })
        }
    })
    .catch((err) => {
        return res.status(500).json({message: `Error to fetch user ${err}`});
    });
};

//Login User
exports.loginUser = (req, res) => {
    let password = req.body.password;
    let email = req.body.email;
    User.findAll({where: {email: email}})
    .then((users) => {
        let fetchedUsers;
        if (users.length > 0) {
            fetchedUsers = users[0];
            bcryptjs.compare(password, fetchedUsers.password)
            .then((isSame) => {
                if (!isSame) {
                    return res.status(503).json({message: 'Invalid Credentials!'});
                }
                //create jwt token
                const token = jwt.sign(
                    {
                        email: email,
                        userId: fetchedUsers.id
                    },
                    'mysecrettoken', 
                    {expiresIn: '1h'}
                );
                return res.status(201).json({token: token, message: "You have logged in successfully"/* , userId: fetchedUsers.id */});
            })
            .catch((error) => {
                return res.status(503).json({message: 'Invalid username or password!'});
            })
        } else {
            return res.status(503).json({message: 'Can not find Users!'});
        }
    })
    .catch((err) => {
        return res.status(503).json({message: 'Email id does not exists!'});
    })
};