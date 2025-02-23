import React from "react";
import { Link } from "react-router-dom";


const Posts = ({ post }) => {

  return (
      <article className='post'>
          <Link to={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
              <p>{post.datetime || 'No date provided'}</p>
          </Link>
          <p>{post.body.length <= 25 ? post.body : `${post.body.slice(0, 25)}...`}</p>
          
      </article>
  );
};

export default Posts;
