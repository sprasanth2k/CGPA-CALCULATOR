var express = require('express')
var bodyParser = require('body-parser')
var mongoClient = require('mongodb').MongoClient
var url = require('../shared/credentials').url
var path = require('path')

const loginRouter = express.Router()
loginRouter.use(bodyParser.json())

loginRouter.route('/')
.get((req,res) => res.status(200).sendFile(path.join(__dirname, '../html', 'login.html')))
.post((req,res) => {
    mongoClient.connect(url, (err, client) => {
        if (err) throw err
        var db = client.db("cgpacalculator")
        var users = db.collection("users")
        users.findOne({'email':req.body.email, 'password' : req.body.password, 'activated' : 'true'},(err, result) => {
            if (err) throw err
            if(result)
            {
                res.send({'statusCode':1,'userId' : result._id})
            }
            else
            {
                res.send({'statusCode':0})
            }
        })
    })
})

module.exports = loginRouter