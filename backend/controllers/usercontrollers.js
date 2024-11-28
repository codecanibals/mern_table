import usermodel from "../models/User.js"
import deleteusermodel from "../models/Deleteuser.js"
import postmodel from "../models/PostModel.js"
import axios from 'axios'
import https from 'https'
import defaultusermodel from "../models/DefaultUser.js"
import { runInNewContext } from "vm"
import commentmodel from "../models/CommentsModel.js"

 const createUser=async(req,res)=>{
  try {
    
    let {name,username,email,phone,id,status}=req.body
    let maxId = 0;
    let Newuser;
    if(id===0){
      const defaultUsers = await defaultusermodel.find();
    
        for(let i = 0 ;i<defaultUsers.length;i++){
          
          if(defaultUsers[i].id>maxId){
            maxId = defaultUsers[i].id
          }
  
        }
        id = maxId +1;
        Newuser=  new usermodel({
          name,username,email,phone,id,status
         })
         
        const newDefaultUser=  new defaultusermodel({
          name,username,email,phone,id,status
         })
      
        await Newuser.save()
        await newDefaultUser.save()
    }
    else{
        Newuser=  new usermodel({
        name,username,email,phone,id,status
       })
    
      await Newuser.save()
    }

   res.status(200).json({success:true,message:"User Created Successfully.", Newuser})
  } catch (error) {
    console.log(error)
  return  res.status(500).json({success:false,message:"Interl server eror"})
  }
}

///////Read api
const getUserData=async(req,res)=>{
       
   try {
    const users= await usermodel.find()
    if (!users) {
      return  res.status(404).json({success:false})
    }

    res.status(200).json({users})
} catch (error) {
    console.log(error)
    
    res.status(500).json({success:false})
   }

}

const getDeleteUser=async(req,res)=>{
       
   try {
    let finalUsersDeleted = [];
    const usersdeleted= await usermodel.find()
    // console.log(usersdeleted)
    if (!usersdeleted) {
      return  res.status(404).json({success:false})
    }
    
    for(let i = 0 ;i<usersdeleted.length;i++){
      if(usersdeleted[i].status === "Deactivate"){
        finalUsersDeleted.push(usersdeleted[i])
      }
    }
    res.status(200).json({finalUsersDeleted})

} catch (error) {
    console.log(error)
    
    res.status(500).json({success:false})
   }

}

const reactivateUser=async(req,res)=>{
       
   try {
    const userId=req.params.id
   
    const userAcivated= await usermodel.findByIdAndUpdate(userId,req.body,{new:true})
    // console.log(usersdeleted)
    if (!userAcivated) {
      return  res.status(404).json({success:false})
    }
    res.status(200).json({success:true,message:"User reactivated successfully"})

} catch (error) {
    console.log(error)
    
    res.status(500).json({success:false})
   }

}

////////update user api
const updateUser=async(req,res)=>{
 try {
     const userId=req.params.id
     console.log(userId)
 const updateuser=await usermodel.findByIdAndUpdate(userId,req.body,{new:true})
   if (!updateuser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
     res.status(200).json({ success: true, message: 'User updated successfully', updateuser });
 } catch (error) {
     console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
 }
}

// delet user api
const deleteUser=async(req,res)=>{
try {
   const userId=req.params.id
   const deletuser= await usermodel.findByIdAndUpdate(userId,{status:"Deactivate"})

  //  const Deleteuser=  new deleteusermodel({
  //      name:deletuser['name'],
  //      email:deletuser['email'],
  //      phone:deletuser['phone'],
  //      id:deletuser['id'],
  //      username:deletuser['username'],
  //      status:deletuser['status']
  //  })
  //  await Deleteuser.save()

   if (!deletuser) {
   return res.status(404).json({ success: false, message: 'user Not found' });
   }
   res.status(200).json({ success: true, message: 'user Deactivated successfully' });
} catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' });
}
}

const url = "https://jsonplaceholder.typicode.com/users";
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});



const getMockUsers = async (req, res) => {
  try {
    let users = [{ "name": "1", "fathername": "xyz", "email": "mno", "phone": "xyz@mno.com" }]
    if (!users) {
      return res.status(404).json({ success: false })
    }

    res.status(200).json({ users })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false })
  }
}

const getUsers = async (req, res) => {
  try {
    const usr = await axios.get(url, { httpsAgent });
    let users = usr.data;
    if (!users) {
      return res.status(404).json({ success: false });
    }

    let dbUsers= await usermodel.find()
    let dbDeletedUsers= await deleteusermodel.find()
    let dbUsersPosts= await postmodel.find()
    let dbDefaultUsers= await defaultusermodel.find()

    // console.log("from  db Default users")
    // console.log(dbDefaultUsers)

    if(dbDefaultUsers.length < 1  ){
      console.log("in the dbDefaultUsers Table")
          for(let i = 0 ;i<users.length;i++){
           
            const newDefaultUser =  new defaultusermodel({
              name:users[i].name,
              username:users[i].username,
              email:users[i].email,
              phone:users[i].phone,
              id:users[i].id
             })
          
            await newDefaultUser.save()
          }
    }

    let finalUsers = [];
    let userFound = false;

    if (users.length > 0 && dbUsers.length > 0) {
      console.log("users and dbUsers having data ...");

    for (var i = 0; i < users.length; i++) {
      for (var j = 0; j < dbUsers.length; j++) {
          let usr = users[i];
          let dbUsr= dbUsers[j];
        
          if (dbUsr.id === usr.id && dbUsr.status === "Active") {
            // dbUsr.status = "Active";
            // dbUsr.posts = [];
            // dbUsr.status = "Available";
            finalUsers.push(dbUsr);
            userFound = true
          }
          //  else if(i===0 && dbUsr.status === "Available"){
           else if(i===0 && dbUsr.status === "Active" && dbUsers[j].id>10){
              // dbUsers[j].posts = []
              finalUsers.push(dbUsers[j]);
           }
        }
     
        if(!userFound){
          let temp = {}
          temp.id = users[i].id;
          temp.name = users[i].name;
          temp.username = users[i].username;
          temp.email = users[i].email;
          temp.phone = users[i].phone;
          temp.status = "Deactivated"
          finalUsers.push(temp)
          temp = {}
        }
        userFound = false
      }
    } else {
      console.log("else block");
      for (var i = 0; i < users.length; i++) {
        let usr = users[i];
        usr.status = "";

        finalUsers.push(usr);
      }
    }

  
      for(let m = 0 ;m<dbUsers.length;m++){
   
           if (dbUsers[m].status === "Deactivate"){
            for(let k = 0 , len = finalUsers.length ;k<len;k++){
              if (finalUsers[k].id === dbUsers[m].id){
                console.log("inside deleted Users")
            finalUsers.splice(k,1)
            len = finalUsers.length
              }
           }
      }
    }

  //   if(dbDeletedUsers.length>0){
  
  //     for(let m = 0 ;m<dbDeletedUsers.length;m++){
  //   for(let k = 0 , len = finalUsers.length ;k<len;k++){
  //          if (finalUsers[k].id === dbDeletedUsers[m].id){
  //           finalUsers.splice(k,1)
  //           len = finalUsers.length
  //          }
  //     }
  //   }
  // }

    console.log("final Users")
    console.log(finalUsers)
    res.status(200).json({ finalUsers});
 } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};

const createPost=async(req,res)=>{
  console.log("inside create post")
  console.log(req.body)
  let dbPosts = await postmodel.find()
  let usersData = await usermodel.find()
  const {id,userId,title,body}=req.body
  let userIsPresent = false;
  try {
  if(usersData){
    for(let i = 0 ; i<usersData.length;i++ ){
      if(userId === usersData[i].id){
        userIsPresent = true
      }
    }
  }

  if(!userIsPresent){
    return res.status(404).json({ success: false, message: 'user Not found' });
  }else{
  if(dbPosts){
    for(let i = 0 ; i<dbPosts.length;i++ ){
      if(dbPosts[i].id === id){
        return res.status(404).json({ success: false, message: 'post  already exist' });
      }
    }
  }
  }

    const newPost=  new postmodel({
      id,userId,title,body
   })

  await newPost.save()
 
   res.status(200).json({success:true,message:"Post Created Successfully."})
  } catch (error) {
    console.log(error)
  return  res.status(500).json({success:false,message:"Interl server eror"})
  }
}

const postUrl = "https://jsonplaceholder.typicode.com/posts";

const getPosts = async (req, res) => {

  try {
    const posts = await axios.get(postUrl, { httpsAgent });
    let postsData = posts.data;

    if (!postsData) {
      return res.status(404).json({ success: false });
    }  
    
    res.status(200).json({ postsData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
}

const commentUrl = "https://jsonplaceholder.typicode.com/comments";

const getComments = async (req, res) => {

  try {
    const comments = await axios.get(commentUrl, { httpsAgent });
    let commentsData = comments.data;

    if (!commentsData) {
      return res.status(404).json({ success: false });
    }  
    
    res.status(200).json({ commentsData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
}

const createComment=async(req,res)=>{

  console.log("inside create comment")
  console.log(req.body)
  
  let dbComments = await commentmodel.find()
  let postsData = await postmodel.find()

  const {id,postId,body}=req.body
  let postIsPresent = false;
  try {
  if(postsData){
    for(let i = 0 ; i<postsData.length;i++ ){
      if(postId === postsData[i].id){
        postIsPresent = true
      }
    }
  }

  if(!postIsPresent){
    return res.status(404).json({ success: false, message: 'post Not found' });
  }else{
  if(dbComments){
    for(let i = 0 ; i<dbComments.length;i++ ){
      if(dbComments[i].id === id){
        return res.status(404).json({ success: false, message: 'comment  already exist' });
      }
    }
  }
  }

    const newComment =  new commentmodel({
      id,postId,body
   })

  await newComment.save()
 
   res.status(200).json({success:true,message:"comment Created Successfully."})
  } catch (error) {
    console.log(error)
  return  res.status(500).json({success:false,message:"Interl server eror"})
  }
}

const getUserPost = async (req, res) => {
  try {
    const usersPost = await postmodel.find();
    
    if (!usersPost) {
      return res.status(404).json({ success: false });
    }  
    console.log("usersPost : " + usersPost)

    res.status(200).json({ usersPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
}

const getUsersComments = async (req, res) => {
  try {
    const usersComments = await commentmodel.find();
    
    if (!usersComments) {
      return res.status(404).json({ success: false });
    }  
    console.log("usersComments : " + usersComments)

    res.status(200).json({ usersComments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
}





export {createUser,getUserData,updateUser,deleteUser,getDeleteUser,getUsers,getMockUsers,getPosts,createPost , getUserPost,getComments,createComment,getUsersComments}