const express=require("express")
const app=express()
const cors=require("cors")
const mongoose=require("mongoose")
const Jwt=require("jsonwebtoken")
const jwtkey="BookList"

const User=require("./models/User")
const Book=require("./models/Book")
const uri=`mongodb+srv://Suryakant:Suryadas@cluster0.mydbwj6.mongodb.net/BookListApp?retryWrites=true&w=majority`


app.use(cors())
app.use(express.json())

mongoose.connect(uri).then(()=>{
    console.log("Connecting to Database sucessfully")
})

app.get("/",(req,resp)=>{
    resp.send({msg:"working fine"})
})
app.post("/signup",async(req,resp)=>{
    try{
        console.log(req.body)
        let newUser=new User(req.body)
        let result=await newUser.save()
        result=result.toObject()
        console.log(result)
        delete result.password
        console.log(result)
        if(result){
            Jwt.sign({result},jwtkey,(err,token)=>{
                if(err){
                    resp.send({msg:"somthing went wrong"})
                }
                else{
                    resp.send({result,auth:token})
                }
            })
        }
    }catch{
        resp.status(400).send({msg:"failed to create an account"})
    }
})
app.post("/signin",async(req,resp)=>{
    try{
        if(req.body.email && req.body.password){
            let result=await User.findOne(req.body).select("-password")
            console.log(result)
            if(result){
                Jwt.sign({result},jwtkey,(err,token)=>{
                    if(err){
                        resp.send({msg:"somthing went wrong"})
                    }
                    else{
                        resp.send({result,auth:token})
                    }
                })
            }
            else{
                resp.send({msg:"User doesn't exit please register"})
            }
        }
        

      
        
    }
    catch{
        // resp.send({msg:"all field are mandatotry"})
    }
})




app.post("/addbook", async (req, resp) => {
    try {
        let newBook = new Book(req.body)
        let result = await newBook.save();
        resp.send(result)
        
    }
    catch {
        resp.status(400).json({ message: "enter a vaild book" })
    }
})

app.get("/home", async (req, resp) => {
    try {
        let allBook = await Book.find();
        if (allBook.length > 0) {
            resp.send(allBook)
            console.log(allBook)
        }
        else {
            resp.send({ result: "no book found" })
        }
    }

    catch {
        resp.status(400).json({ message: "no book found" })
    }
})

app.delete("/home/:id", async (req, resp) => {
    try {
        let result = await Book.deleteOne({ _id: req.params.id })
        resp.send(result)
    }
    catch {
        resp.status(400).json({ message: "no book is found to be delete" })
    }
})


app.get("/home/:id", async (req, resp) => {
    try {

        let result = await Book.findOne({ _id: req.params.id })
        if (result) {
            resp.send(result)
        }
        else {
            resp.send({ result: "no record found" })
        }
    }
    catch {
        resp.status(400).json({ message: "no book is found" })
    }
})
app.get("/editbook/:id", async (req, resp) => {
    try {

        let result = await Book.findOne({ _id: req.params.id })
        if (result) {
            resp.send(result)
        }
        else {
            resp.send({ result: "no record found" })
        }
    }
    catch {
        resp.status(400).json({ message: "no book is found" })
    }
})

app.put("/editbook/:id", async (req, resp) => {
    try{

        let result = await Book.updateOne(
            { _id: req.params.id },
            {
                $set: req.body
            }
        )
       
        resp.send(result)
    }
    catch{
        resp.status(400).json({ message: "error in upadating" })
    }
})
app.listen(5003,()=>{console.log("app is running at port number 5003")})