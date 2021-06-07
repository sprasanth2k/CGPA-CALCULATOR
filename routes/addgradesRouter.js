var express = require('express')
var bodyParser = require('body-parser')
var mongoClient = require('mongodb').MongoClient
var url = require('../shared/credentials').url
var path = require('path')

const addgradesRouter = express.Router()
addgradesRouter.use(bodyParser.json())

addgradesRouter.route('/')
.get((req,res) => res.sendFile(path.join(__dirname, '../html', 'addGrades.html')))
.post((req,res) => {
    mongoClient.connect(url, (err, client) => {
        if (err) throw err
        var db = client.db("cgpacalculator")
        var marks = db.collection("marks")
        
        marks.updateOne({'userId' : req.body.userId}, {$push: {'semesters': req.body.sem}}, (err, result) => {
            if (err) 
            {
                res.send({'statusText' : 'Sorry there was an error in adding your grades'})
            }
            else
            {
                if(result.matchedCount)
                    res.send({'statusText' : 'Added Successfully'})
                else
                    res.send({'statusText' : 'Access Denied...!\nYou dont have access to this page'})
            }
        })
    })
})

module.exports = addgradesRouter