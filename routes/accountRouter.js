var express = require('express')
var bodyParser = require('body-parser')
var mongoClient = require('mongodb').MongoClient
var url = require('../shared/credentials').url

const accountRouter = express.Router()
accountRouter.use(bodyParser.json())

accountRouter.post('/verifyUser', (req,res) => {
    mongoClient.connect(url, (err, client) => {
        if (err) throw err
        var db = client.db("cgpacalculator")
        var marks = db.collection("marks")

        marks.findOne({'userId' : req.body.userId}, (err,result) => {
            if(err) throw err
            if(result)
            {
                res.send({'statusCode' : 1,'semesters' : result.semesters})
            }
            else
                res.send({'statusCode' : 0})
            
        })
    })
})

module.exports = accountRouter