const express = require("express");

const accountsRouter = require('./accounts/accounts-router') //added this in for the accountRouter

const server = express();

server.use(express.json());




server.use('/api/accounts', accountsRouter) //this needs to be put in this spot below express.json thing
//and about the server.use('*')




server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
}) //always put at the bottom

module.exports = server;
