import React,{useState,useEffect} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'


const CommentTable = () => {
    const [commentsData, setCommentsData] = useState([]);
    const [isCommentsLoading,setIsCommentsLoading] = useState(false)
   
    const fetchCommentsData = async () => {
      try {
        const comments = await axios.get("http://localhost:8080/api/getComments");
        const response = await comments.data;
    
        setCommentsData(response.commentsData);
        
        
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      fetchCommentsData();
    },[]);
  
  
    const createComment = async (postId) => {
      setIsCommentsLoading(true)
      console.log(postId)
      let newComment = {}
      for(let i = 0 ;i<commentsData.length;i++){
          if(commentsData[i].id === postId){
              newComment = commentsData[i]
          }
      }
      
      try {
        const addCommnet = await axios.post('http://localhost:8080/api/createComment', newComment)
        console.log("Comment is created")
        const response =  addCommnet.data
        
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
    
    setIsCommentsLoading(false)
};
  return (
    <>
      <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>
                  Manage <b> Users Comments</b>
                </h2>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th></th>
                <th>Id</th>
                <th>Post Id</th>
                <th>Body</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {commentsData?.map((elem, index) => {
               
                return (
                  <tr>
                    <td></td>
                    <td>{elem.id}</td>
                    <td>{elem.postId}</td>
                    <td>{elem.body}</td> 
                        <div>
                      <button onClick={() => createComment(elem.id)}>
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

export default CommentTable
