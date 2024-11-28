import mongoose from "mongoose";

const deleteUserSchema= new mongoose.Schema({
    // name:{
    //     type:String,
    //     required:true
    // },
    //     fathername:{
    //     type:String,
       
    // }, 
    //    email:{
    //     type:String,
    //     required:true
    // },
    //      phone:{
    //     type:String,
    //     required:true
    // }

    id:{
        type:Number,
        default:0,
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
},{timestamps:true})


const deleteusermodel= mongoose.model('deleteuser',deleteUserSchema)

export default deleteusermodel