import React, { useContext } from 'react'
import { useParams, Link } from "react-router-dom";
import DataContext from "./context/DataContext";


const Postpage = () => {
  const { posts, handledelete } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() == id);
  return (
    <article className='PostPage'>
      <h2>{post.title}</h2>
      <p>{post.datetime || 'No date provided'}</p>
      <p>{post.body.length <= 25 ? post.body : `${post.body.slice(0, 25)}...`}</p>

      <div className="Button_container">
        <button className="deleteButton" onClick={() => handledelete(post.id)} >Delete</button>
        <Link to={`/posts/edit/${id}`}><button className="deleteButton">Editpost</button></Link>
      </div>
    </article>
  );
};

export default Postpage;
