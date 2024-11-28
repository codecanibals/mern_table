import React, { useState } from 'react'
import Table from '../Component/Table'
import AddUser from '../Component/AddUser'
import UpdatedUser from '../Component/UpdatedUser'
import axios from 'axios'
import toast from 'react-hot-toast'
import Deleteusertable from '../Component/Deleteusertable'

export default function UserTable() {


    const [isUpdateLoading,setIsUpdateLoading] = useState(false)
    const [isDeleteLoading,setIsDeleteLoading] = useState(false)

    const [userId, setUserId] = useState()
    const [updatedUserId, setUpdatedUserId] = useState()
    const [value, setValue] = useState({
        name: "",
        username: "",
        email: "",
        phone: ""
    })
    const deletuser = (userid) => {
        setUserId(userid)
    }
    const handleUserDelete = () => {
        setIsDeleteLoading(true)
        console.log("delete is loading")
        setIsDeleteLoading(false)
    }

    const handlechange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })

    }


    const UpadteUserData = (Updatedid,elem) => {

        setUpdatedUserId(Updatedid)
        console.log(elem)
        setValue(elem)
        
       

    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setIsUpdateLoading(true)
        try {
            const UpdatedUser = await axios.put(`http://localhost:8080/api/updateUser/${updatedUserId}`,value)
            const response = UpdatedUser.data
            //  console.log(response)
            if (response.success) {
                toast.success(response.message)
            }
            // console.log(response)
        } catch (error) {
            console.log(error)
        }
        // console.log(value)
        setIsUpdateLoading(false)
    }
    return (
        <>
            <Table Deletuser={deletuser} UpdatedUser={UpadteUserData} isUpdateLoading = {isUpdateLoading}></Table>
            
        
            <UpdatedUser handleOnSubmit={handleOnSubmit} value={value} handlechange={handlechange}></UpdatedUser>
            {/* <DeletUser handleUserDelet={handleUserDelet} ></DeletUser> */}
            {/* <Deleteusertable isDeleteLoading = {isDeleteLoading} ></Deleteusertable> */}
        </>
    )
}