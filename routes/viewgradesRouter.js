var express = require('express')
var bodyParser = require('body-parser')
var mongoClient = require('mongodb').MongoClient
var url = require('../shared/credentials').url
var path = require('path')

const viewgradesRouter = express.Router()
viewgradesRouter.use(bodyParser.json())

viewgradesRouter.route('/')
.get((req,res) => res.sendFile(path.join(__dirname, '../html', 'viewGrades.html')))
.put((req,res) => {
    mongoClient.connect(url, (err, client) => {
        if (err) throw err
        var db = client.db("cgpacalculator")
        var marks = db.collection("marks")
        
        marks.updateOne({'userId' : req.body.userId}, {$set: {'semesters': req.body.semesters}}, (err, result) => {
            if (err) 
            {
                res.send({'statusText' : 'Sorry there was an error in updating your grades'})
            }
            else
            {
                if(result.matchedCount)
                    res.send({'statusText' : 'Updated Successfully'})
                else
                    res.send({'statusText' : 'Access Denied...!\nYou dont have access to this page'})
            }
        })
    })
})

.delete((req,res) => {
    mongoClient.connect(url, (err, client) => {
        if (err) throw err
        var db = client.db("cgpacalculator")
        var marks = db.collection("marks")
        
        marks.updateOne({'userId' : req.body.userId}, {$set: {'semesters': req.body.semesters}}, (err, result) => {
            if (err) 
            {
                res.send({'statusText' : 'Sorry there was an error in deleting your grades'})
            }
            else
            {
                if(result.matchedCount)
                    res.send({'statusText' : 'Deleted Successfully'})
                else
                    res.send({'statusText' : 'Access Denied...!\nYou dont have access to this page'})
            }
        })
    })
})


module.exports = viewgradesRouter