import { createContext,useState,useEffect } from "react";
import useAxiaosFetch from '../hooks/useAxiaosFetch' 
import { useNavigate } from "react-router-dom";
import api from '../api/posts'

import format from "date-fns/format";

const DataContext = createContext({}); 
const URL =window.location.hostname === "localhost"
? "http://localhost:8080"
: "https://server-production-33bb.up.railway.app"
const DataProvider = ({children}) => {
  const { data, isloading, fetchError } = useAxiaosFetch(`${URL}/posts`);
  const [posts, setposts] = useState([]);
    const [search, setSearchip] = useState('')
    const [searchResults, setSearch] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const Navigate = useNavigate();
    const [edittitle, setEditTitle] = useState('');
    const [editbody, setEditBody] = useState('');
  
    useEffect(() => {
      setposts(data);
    }, [data])
  
    useEffect(() => {
      const filteredposts = posts.filter((post) => (
        (post.body).toLowerCase().includes(search.toLowerCase())
      ) || (post.title).toLowerCase().includes(search.toLowerCase())
      )
      setSearch(filteredposts.reverse())
    }, [posts, search])
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const id = posts.length + 1;
      const datetime = format(new Date(), 'MMMM dd, yyyy pp')
      const newpost = {
        title: title, body: body, datetime: datetime
      }
      try {
        const response = await api.post('/posts', newpost);
        const updatedpost = [...posts, response.data.post];
         setposts(updatedpost);
        setTitle('');
        setBody('');
          Navigate('/');
      } catch (err) {
        console.log("error", err)
      }
    }
  
    // const { id } = useParams();
    const handledelete = async (id) => {
      try {
        await api.delete(`/posts/${id}`)
        const removeitems = posts.filter((pst) => (
          pst.id != id
        ))
        setposts(removeitems);
        Navigate('/');
      } catch (err) {
        console.log("error deleting item", err)
  
      }
  
    }
  
    const handledit = async (id) => {
      const datetime = format(new Date(), 'MMMM dd, yyyy pp')
  
      const data = {
        id,
        title: edittitle,
        body: editbody,
        datetime: datetime
      }
      try {
        const update = await api.put(`posts/${id}`, data)
        setposts(posts.map(post => (post.id == id) ? { ...update.data } : post));
        setEditBody('');
        setEditTitle('');
        Navigate('/');
  
      } catch (err) {
        console.log(`Error:${err}`)
      }
  
  
    }
  return (
    <DataContext.Provider value={{data, isloading, fetchError,title,setBody,setTitle,body,handleSubmit,search, setSearchip,setEditBody,handledit,setEditTitle,edittitle,editbody,posts,handledelete,searchResults}} >
        {children}
    </DataContext.Provider>
  )
}
export { DataProvider };
export default DataContext;