import express from 'express'
import axios from 'axios'
import { createUser,getUserData,updateUser,deleteUser,getDeleteUser,getUsers,getMockUsers,getPosts,createPost,getUserPost,getComments,createComment,getUsersComments} from '../controllers/usercontrollers.js'

const routers=express.Router()

routers.post('/createUser',createUser)
routers.get('/getUser',getUserData)
routers.get('/getDeleteUser',getDeleteUser)
routers.put('/updateUser/:id',updateUser)
routers.delete('/deleteUser/:id',deleteUser)
routers.get('/getUsers',getUsers)   
routers.get('/getMockUsers',getMockUsers)
routers.post('/createPost',createPost)
routers.get('/getPosts',getPosts)
routers.get('/getUserPost',getUserPost)
routers.post('/createComment',createComment)
routers.get('/getComments',getComments)
routers.get('/getUsersComments',getUsersComments)


export default routers