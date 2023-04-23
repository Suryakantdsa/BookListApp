const mongoose=require("mongoose")

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    isbn:{
        type:String,
        required:true
    }
    ,
    author:{
        type:String,
        required:true
    }
    ,
    bookDesc:{
        type:String,
        required:true
    }
    ,
    publiseTime:{
        type:String,
        required:true
    },
    publiser:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("books",bookSchema)