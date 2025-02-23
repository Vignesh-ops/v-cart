import React, { useContext, useEffect } from 'react'

import { useParams } from 'react-router-dom'
import DataContext from './context/DataContext';

const Editpost = () => {
  const {setEditBody,handledit,setEditTitle,edittitle,editbody,posts} = useContext(DataContext);
  const {id} = useParams();
  const editposts = posts.find(post=>(post.id).toString()==id);
  useEffect(()=>{
    if(editposts){
      setEditBody(editposts.body);
      setEditTitle(editposts.title);
    }
  },[editposts,setEditBody,setEditTitle])
  return (
    <main  className='NewPost'>
      {editposts &&
    <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
        <label>Title:</label>
        <input type='text' onChange={(e)=>setEditTitle(e.target.value)} value={edittitle} />
        <label>Body:</label>
        <input type='text' onChange={(e)=>setEditBody(e.target.value)} value={editbody} />
        <button onClick={()=>handledit(editposts.id)} type='submit'>Submit</button>
    </form>
    }
</main>  )
}

export default Editpost