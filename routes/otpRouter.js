var express = require('express')
var bodyParser = require('body-parser')
var mongoClient = require('mongodb').MongoClient
var url = require('../shared/credentials').url

const otpRouter = express.Router()
otpRouter.use(bodyParser.json())

otpRouter.post('/', (req,res) => {
    mongoClient.connect(url, (err, client) => {
        if (err) throw err
        var db = client.db("cgpacalculator")
        var users = db.collection("users")
        var marks = db.collection("marks")
        users.findOne({'email':req.body.email,'otp' : req.body.otp},(err, result) => {
            if (err) throw err
            if(result)
            {
                let userId = String(result._id)
                let user = { $set : {'otp' : 'null', 'activated' : 'true'} }
                users.updateOne({'email' : req.body.email}, user,(err, result) => {
                    if (err) throw err;
                    else
                    {
                        let mark = {
                            'userId' : userId,
                            'semesters' : []
                        }
                        marks.insertOne(mark, (err,x) => {
                            if(err) throw err
                            else
                            {
                                res.send({'statusCode':1,'statusText':'Account created successfully'})
                            }
                        })
                        
                    }
                })
            }
            else
            {
                res.send({'statusCode':0,'statusText':'OTP does not match'})
            }
            
        })
    })
})

module.exports = otpRouter