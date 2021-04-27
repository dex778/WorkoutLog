const express = require('express')
const router = require('express').Router();
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', (req, res) => {
    User.create({
        username: req.body.username,
        passwordhash: bcrypt.hashSync(req.body.passwordhash, 10)
    })
    .then(user => {
        let token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '1d'} ) //payload, secret, options
        res.send({ user, sessionToken: token })
    })
    .catch(error => res.status(500).send({
        message: 'user not registered',
        error: error.errors[0].message
    }))
})

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if(user){
            bcrypt.compare(req.body.passwordhash, user.passwordhash, function(err, matches){
                matches ? generateToken(user) : res.send('Incorrect password')
            })
            
            function generateToken(user){
                let token = jwt.sign({ id: user.id}, process.env.SECRET, { expiresIn: '1d' })
                res.send({user, token})
            }
        } else {
            res.send('User not found, try again.')
        }
    })
})



module.exports = router;