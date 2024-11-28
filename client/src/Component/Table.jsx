import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Table({ UpdatedUser, isUpdateLoading }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [postsdata, setPostsData] = useState([]);
  const [commentsdata, setCommentsData] = useState([]);
  const [postsDataLoading, setPostsDataLoading] = useState(false);

  const fetchData = async () => {
    try {
      const user = await axios.get("http://localhost:8080/api/getUsers");
      const response = await user.data;

      setData(response.finalUsers);
      console.log("this is users data");
      console.log(response.finalUsers);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [isLoading, isUpdateLoading]);

  const createUser = async (userId) => {
    setIsLoading(true);
    let newUser = {};
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === userId) {
        newUser = data[i];
      }
    }
    newUser.status = "Active";
    try {
      const adduser = await axios.post(
        "http://localhost:8080/api/createUser",
        newUser
      );
      console.log("main data here");
      console.log(data);
      const response = adduser.data;
      if (response.success) {
        toast.success(response.Message);
        CloseRef.current.click();
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const deleteUser = async (userId) => {
    setIsLoading(true);
    console.log(userId);
    try {
      const DeletUser = await axios.delete(
        `http://localhost:8080/api/deleteUser/${userId}`
      );
      const response = DeletUser.data;
      if (response.success) {
        toast.success(response.message);
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handelUserPosts = async (userId) => {
    setPostsDataLoading(true);
    console.log("inside handel User Posts" + userId);
    try {
      const usersPosts = await axios.get(
        "http://localhost:8080/api/getUserPost"
      );
      const response = await usersPosts.data;
      let tempPosts = ["No data Found"];
      for (let i = 0; i < response.usersPost.length; i++) {
        console.log("inside post for loop + " + userId);
        let usrPosts = response.usersPost[i];
        if (usrPosts.userId === userId) {
          console.log("inside the if condtion " + usrPosts.userId);
          tempPosts.push(usrPosts);
          console.log(tempPosts + " This is posts dataaaaaaaa");
        }
      }

      setPostsData(tempPosts);

      setPostsDataLoading(false);
      console.log("this is temp posts " + postsdata);
    } catch (error) {
      console.log(error);
    }
  };

  const handelUserComments = async (id) => {
  
    console.log("inside handel User Comments" + id);
    try {
      const usersComment = await axios.get(
        "http://localhost:8080/api/getUsersComments"
      );
      const response = await usersComment.data;
     
      let tempComments = response.usersComments;
      let tempPostsData = [];
      // let filteredComments = [];
      console.log("This is Post Data : " , postsdata)
      for(let i = 0 ;i<postsdata.length;i++){
         if(postsdata[i].userId == id ){
          tempPostsData.push(postsdata[i]);
         }
      }

     console.log("This is usersComments " , tempComments)
     console.log("This is temp posts data " , tempPostsData)

     const filteredComments = tempComments.filter(comment => {
      return postsdata.some(post => post.id === comment.postId);
    });

    // for(let i = 0 ;i<tempComments.length;i++){
    //   for(let k = 0 ;k<tempPostsData.length;k++){
    //     if(tempComments[i].postId === tempPostsData[k].id){
    //       console.log("inside for loop Comment Data" , tempComments[i])
    //       console.log("inside for loop post Data" , tempPostsData[k])
    //       filteredComments.push(tempComments[i]);
    //       break;
    //     }
    //   }
       
    // }

    console.log("Filtered Comments: ", filteredComments);
    console.log("Temp Comments: ", tempComments);
      console.log("Posts Data: ", postsdata);

    // console.log("This is temp Comment Data " , tempComments)
  
      setCommentsData(filteredComments);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>
                  Manage <b>Users Data</b>
                </h2>
              </div>
              <div className="col-sm-6"></div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Posts</th>
                <th>Comments</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((elem, index) => {
                return (
                  <tr>
                    <td></td>
                    <td>{elem.name}</td>
                    <td>{elem.username}</td>
                    <td>{elem.email}</td>
                    <td>{elem.phone}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick ={()=>{handelUserPosts(elem.id)}}
                      >
                        Posts
                      </button>

                      <div
                        class="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">
                                Posts
                              </h5>
                              <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                       
                            <table>
                              <thead>
                                <th>id</th>
                                <th style={{width:"70%"}}>title</th>
                                {/* <th>body</th> */}
                              </thead>            
                              <tbody>
                              {postsdata?.map((elem, index) => {
                                return (
                                    <tr>
                                <td>{elem.id}</td>
                                <td style={{width:"70%"}}>{elem.title}</td>
                                {/* <td>{elem.body}</td> */}
                                </tr>
                                );
                                 })}
                              </tbody>
                            </table>
                   
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                              {/* <button type="button" class="btn btn-primary">
                                Save changes
                              </button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#exampleModalComment"
                        onClick ={()=>{handelUserComments(elem.id)}}
                      >
                        Comments
                      </button>

                      <div
                        class="modal fade"
                        id="exampleModalComment"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabelComment"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabelComment">
                                Comments
                              </h5>
                              <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                       
                            <table>
                              <thead>
                                <th>postId</th>
                                <th>id</th>
                                <th style={{width:"70%"}}>body</th>
                                {/* <th>body</th> */}
                              </thead>            
                              <tbody>
                              {commentsdata?.map((elem, index) => {
                                return (
                                    <tr>
                                <td>{elem.postId}</td>
                                <td>{elem.id}</td>
                                <td style={{width:"70%"}}>{elem.body}</td>
                                {/* <td>{elem.body}</td> */}
                                </tr>
                                );
                                 })}
                              </tbody>
                            </table>
                   
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                              {/* <button type="button" class="btn btn-primary">
                                Save changes
                              </button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    {elem.status === "Active" ? (
                      <td>
                        <div>
                          <a
                            href="#"
                            className="edit cursor-pointer"
                            data-bs-toggle="modal"
                            data-bs-target="#editEmployeeModal"
                            onClick={() => UpdatedUser(elem._id, elem)}
                          >
                            <i
                              className="material-icons"
                              data-bs-toggle="tooltip"
                              title="Edit"
                            >
                              &#xE254;
                            </i>
                          </a>
                          <a
                            href="#"
                            className="delete cursor-pointer"
                            onClick={() => deleteUser(elem._id)}
                          >
                            <i
                              className="material-icons"
                              data-bs-toggle="tooltip"
                              title="delete"
                            >
                              &#xE872;
                            </i>
                          </a>
                        </div>
                      </td>
                      
                    ) : (
                      <div>
                        <button onClick={() => createUser(elem.id, elem._id)}>
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
