import mongoose from "mongoose";

const postSchema= new mongoose.Schema({

    id:{
        type:Number, 
        required:true
    },
    userId:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    status:{
        type:String
    },
},{timestamps:true})

const postmodel= mongoose.model('post',postSchema)

export default postmodel