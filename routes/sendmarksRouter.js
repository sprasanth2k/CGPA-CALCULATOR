var express = require('express')
var bodyParser = require('body-parser')
var mongoClient = require('mongodb').MongoClient
var url = require('../shared/credentials').url
var path = require('path')
var { sendEmail, getMarksMsg } = require('../shared/email')

const sendmarksRouter = express.Router()
sendmarksRouter.use(bodyParser.json())

sendmarksRouter.route('/')
.get((req,res) => res.status(200).sendFile(path.join(__dirname, '../html', 'sendMarks.html')))
.post((req,res) => {
    mongoClient.connect(url, (err, client) => {
        if (err) throw err
        var db = client.db("cgpacalculator")
        var marks = db.collection("marks")

        marks.findOne({'userId' : req.body.userId},(err, result) => {
            if (err) res.send({'statusText':'Sorry...There was an error in sending the marks\nPlease try again later'})
            else if(result)
            {
                sendEmail(req.body.receivers, 'Semester marks', getMarksMsg(result.semesters))
                res.send({'statusText':'Email sent successfully...!'})
            }
            else
            {
                res.send({'statusText':'Unauthorized access...\nAccess denied'})
            }
        })
    })
})

module.exports = sendmarksRouter