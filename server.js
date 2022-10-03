const express = require ('express')
const app = express()
const bcrypt  = require('bcrypt')
const users = []

app.use(express.json());
app.get('/user',(req,res)=>{
    res.json(users);
})

// this is when user singup
app.post('/user', async (req,res)=>{
 try{
    const hashPassword = await bcrypt.hash(req.body.password , 10);
   const user = {name : req.body.name , password : hashPassword}
   users.push(user)
   req.status(200).send()
 }
 catch{
    res.status(404).send()
 }
})

// this is login 
app.post('/user/login', async (req,res)=>{
    const user = users.find(user=> user.name === req.body.name)
    if (user==null) {
       res.send('enter valid user name') 
    }
    try{
       var comp = await bcrypt.compare(req.body.password,user.password)
       if (comp) {
        res.status(200).send('successfully logged in!')
       } else {
        res.status(200).send('password is incorrect ')
       }
    }
    catch{
        res.status(400).send()
    }
})
app.listen(8080 , ()=>{
    console.log("listening to port 8080")
})