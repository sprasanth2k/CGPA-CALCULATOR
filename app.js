var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')

var app = express()
var PORT = process.env.PORT || 5000

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.static('public'))

const loginRouter = require('./routes/loginRouter')
const signupRouter = require('./routes/signupRouter')
const otpRouter = require('./routes/otpRouter')
const addgradesRouter = require('./routes/addgradesRouter')
const accountRouter = require('./routes/accountRouter')
const viewgradesRouter = require('./routes/viewgradesRouter')
const sendmarksRouter = require('./routes/sendmarksRouter')

app.get('/', (req,res) => res.redirect('/home'))

app.use('/login', loginRouter)
app.use('/signup', signupRouter)
app.use('/verifyOTP', otpRouter)
app.use('/account', accountRouter)
app.use('/home/add_grades', addgradesRouter)
app.use('/home/view_grades', viewgradesRouter)
app.use('/home/send_marks', sendmarksRouter)


app.get('/home', (req,res) => res.status(200).sendFile(__dirname + '/html/home.html'))
app.get('/home/calculate_gpa', (req,res) => res.status(200).sendFile(__dirname + '/html/gpa.html')) 

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))