import React, { useRef, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';



export default function AddUser() {
    const [value, setValue] = useState({
        name: '',
        username: '',
        email: '',
        phone: "",
        id:0,
        status:"Active",
    })
    const handleOnchange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    };


    const CloseRef = useRef()
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const adduser = await axios.post('http://localhost:8080/api/createUser', value)
            const response = adduser.data
            if (response.success) {
                toast.success(response.Message)
                CloseRef.current.click()

            }
            console.log(response)
        } catch (error) {
            console.log(error)
        }


    };
    return (
        <>


            {/* <div id="addEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content"> */}
                        <form onSubmit={handleSubmit} style={{margin:"50px 0px 0px 180px"}}>
                            <div className="">
                                <h4 >Add User</h4>
                               
                            </div>
                         
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" style={{width:"600px"}}value={value.name} name='name' onChange={handleOnchange} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label>Username </label>
                                    <input type="text" value={value.username} name='username' onChange={handleOnchange} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" value={value.email} name='email' onChange={handleOnchange} className="form-control" required />

                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="text" value={value.phone} name='phone' onChange={handleOnchange} className="form-control" required />
                                </div>
                         
                            <div className="modal-footer">
                                {/* <input type="button" className="btn btn-default" data-bs-dismiss="modal" value="Cancel"  /> */}
                                <input type="submit" className="btn btn-primary" style={{width:"400px",margin:"20px 100px 0px 0px"}}value="Submit" />
                            </div>

                        </form>
                    {/* </div>
                </div>
            </div> */}



        </>
    )
}
