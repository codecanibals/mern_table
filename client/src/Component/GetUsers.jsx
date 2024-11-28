import React from 'react'

function GetUsers() {
    
    const [isLoading,setIsLoading] = useState(false)
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
          const user = await axios.get("http://localhost:8080/api/getUsers");
          const response = await user.data;
      
          setData(response.finalUsers);
          
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        fetchData();
      },[]);

  return (
    <>
    </>
  )
}

export default GetUsers
