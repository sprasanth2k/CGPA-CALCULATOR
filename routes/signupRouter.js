var express = require('express')
var bodyParser = require('body-parser')
var mongoClient = require('mongodb').MongoClient
var url = require('../shared/credentials').url
var { sendEmail, getOTPMsg } = require('../shared/email')

const signupRouter = express.Router()
signupRouter.use(bodyParser.json())


signupRouter.post('/',(req,res) => {    
    mongoClient.connect(url , (err, client) => {
        if (err) throw err
        var db = client.db("cgpacalculator")
        var users = db.collection("users")
        users.findOne({'email': req.body.email,'activated' : 'true'},(err, result) => {
            if (err) throw err
            if(result)
                res.send({'result':'Email already registered','statusCode':0})
            else
            {
                let i,otp=''
                for(i=0;i<6;i++)
                {
                    otp+=Math.floor(Math.random()*10)
                }
                users.findOne({'email' : req.body.email,'activated' : 'false'},(err, result) => {
                    if (err) throw err
                    if(result)
                    {
                        let user = { $set : {'otp' : otp, 'password' : req.body.password} }
                        users.updateOne({'email' : req.body.email}, user,(err, temp) => {
                            if (err) throw err;
                            else
                            {
                                sendEmail(req.body.email, 'Account Activation', getOTPMsg(req.body.email, otp))
                                res.send({'statusCode' : 1})
                            }
                        })
                    }
                    else
                    {
                        let user = {
                            'email' : req.body.email,
                            'password' : req.body.password,
                            'otp' : otp,
                            'activated' : 'false'
                        }
                        users.insertOne(user,(err,x) => {
                            if(err) throw err
                            else
                            {
                                sendEmail(req.body.email, 'Account Activation', getOTPMsg(req.body.email, otp))
                                res.send({'statusCode':1})
                            }
                        })
                    }
                })
            }
        })
    })
})

module.exports = signupRouter