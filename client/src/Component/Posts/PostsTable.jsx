import React,{useState,useEffect} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
const PostsTable = () => {

  const [postsData, setPostsData] = useState([]);
  const [isPostsLoading,setIsPostsLoading] = useState(false)
 
  const fetchPostsData = async () => {
    try {
      const posts = await axios.get("http://localhost:8080/api/getPosts");
      const response = await posts.data;
  
      setPostsData(response.postsData);
      
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPostsData();
  },[]);


  const createPost = async (userId) => {
    setIsPostsLoading(true)
    console.log(userId)
    let newPost = {}
    for(let i = 0 ;i<postsData.length;i++){
        if(postsData[i].id === userId){
            newPost = postsData[i]
        }
    }
    
    try {
      const addPost = await axios.post('http://localhost:8080/api/createPost', newPost)
      console.log("Post is created")
      const response =  addPost.data
      
      if (response.success) {
          toast.success(response.message)
          // CloseRef.current.click()
      }

  } catch (error) {
      console.log(error)
      if(!error.response.success){
        toast.error(error.response.data.message)
          // CloseRef.current.click()
      }
  }
  
  setIsPostsLoading(false)
  };

  return (
    <>
     <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>
                  Manage <b> Users Posts</b>
                </h2>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th></th>
                <th>Employee Id</th>
                <th>Post Id</th>
                <th>Post Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {postsData?.map((elem, index) => {
               
                return (
                  <tr>
                    <td></td>
                    <td>{elem.userId}</td>
                    <td>{elem.id}</td>
                    <td>{elem.title}</td> 
                        <div>
                      <button onClick={() => createPost(elem.id)}>
                        <i className="fa-solid fa-plus"></i>
                      </button>
                   
                      </div>
                 
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default PostsTable
