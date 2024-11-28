import mongoose from "mongoose";

const userSchema= new mongoose.Schema({

    id:{
        type:Number
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
    website:{
        type:String,
    },
    status:{
        type:String
    },
    // posts:{
    //     type:Array,
    //     default:[]
    // },
},{timestamps:true})

const usermodel= mongoose.model('user',userSchema)

export default usermodel