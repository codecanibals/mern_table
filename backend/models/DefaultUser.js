import mongoose from "mongoose";

const defaultUserSchema= new mongoose.Schema({

    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
       
    }, 
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    status:{
        type:String
    },
  
},{timestamps:true})

const defaultusermodel= mongoose.model('defaultuser',defaultUserSchema)

export default defaultusermodel