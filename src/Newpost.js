import React, { useContext } from 'react'
import DataContext from './context/DataContext'

const Newpost = () => {
    const {title,setBody,setTitle,body,handleSubmit} = useContext(DataContext);
    return (
        <main  className='NewPost'>
            <form className='newPostForm' onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type='text' onChange={(e)=>setTitle(e.target.value)} value={title} />
                <label>Body:</label>
                <input type='text' onChange={(e)=>setBody(e.target.value)} value={body} />
                <button type='submit'>Submit</button>
            </form>
        </main>

    )
}

export default Newpost