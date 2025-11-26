const express = require('express')
const app = express()

app.use(express.json())

function checkdata(req,res,next){
    // console.log(req.body)
    // object destructring
    const {user , email, password}=req.body
    if(!user || typeof user!=='string'){
        return res.status(400).json({message:"invalid username"})
    }
    if(!email || !email.includes('@')){
        return res.status(400).json({message:"invalid email"})
    }
    if(!password || password.lenght<6){
        return res.status(400).json({message:"invalid password"})
    }
    next()
}
app.use(checkdata)

app.post("/user",(req,res)=>{
    res.status(201)
    res.json({message:"user created successfully",data:req.body})

})

const port =3000
app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
})
