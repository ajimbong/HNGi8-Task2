
const express = require('express')
const app = express()
require('dotenv').config()
const port = 3000;
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
}) 

app.use(express.urlencoded({extended: true}))
app.use(express.json())
//app.use(express.static('public'))
app.use('/public', express.static('public') )
app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/form', (req, res)=>{
    const data = req.body
    console.log(data)
    let mailOptions = {
        from: data.email,
        to:  process.env.EMAIL,
        subject: `Node-Form message is from ${data.name} with email ${data.email}`,
        text: `Hey Ajim, I reached out to you on your website form.
        My name is : ${data.name}
        My message is :  ${data.message}`
    }

    transporter.sendMail(mailOptions, (err, data)=>{
        if(err){
            console.error('An Error occured' +err)
            res.send('An error occured!! The mail did not go')
        } else {
            console.log('The email was sent successfully')
            res.send('The mail went successfully')
        }
    })
})
 
     


app.listen(port , ()=> console.log('server running on' +port))