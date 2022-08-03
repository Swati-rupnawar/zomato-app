// import module
const express = require('express')
// import body-parse
const bodyparse = require('body-parser')
const restaurantrouter = require('./Routes/restaurant')
const Locationrouter = require('./Routes/location')
const menurouter = require('./Routes/menu')

const mealtyperouter = require('./Routes/mealtype')
const paymentrouter = require('./Routes/Payment')
const signupRouter = require('./Routes/signup')
const loginRouter = require('./Routes/Login')

const cors = require('cors')

const mongoose = require('mongoose')

// connect with mongodb
const DBCONNECTIONSTRING = "mongodb+srv://root:root@cluster0.qxodq.mongodb.net/zomato"

// 'mongodb://127.0.0.1:27017/zomato_assign_6'

// connect to mongoose server
mongoose.connect(
    DBCONNECTIONSTRING,
    ()=>{
    console.log("mongoodb connected")
    },
    e=>console.log(e))


const PORT = process.env.PORT || 6767 ;

var app = express()

// middleware
app.use(bodyparse.json())
app.use(cors())
app.use('/restaurant',restaurantrouter)
app.use('/location',Locationrouter)
app.use('/menu',menurouter)
app.use('/mealtype',mealtyperouter)
app.use('/pay',paymentrouter)
app.use('/signUp',signupRouter)
app.use('/login',loginRouter)


// heroku configuration:
if(process.env.NODE_ENV="Production"){
    app.use(express.static('frontend/build'));
    const path = require('path')
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })
}


// listen to port
app.listen(PORT,()=>{
    console.log("app is runnung on port",PORT)
})