import mongoose from "mongoose";

const commentSchema= new mongoose.Schema({

    postId:{
        type:Number, 
        required:true
    },
    id:{
        type:Number,
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

const commentmodel= mongoose.model('comment',commentSchema)

export default commentmodel