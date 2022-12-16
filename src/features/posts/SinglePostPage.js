import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectPostbyId } from './PostSlice'
import Reactions from "./Reactions";
import Author from "./Author";
import TimeAgo from "./TimeAgo";

const SinglePostPage = () => {
    const { postId } = useParams()

    // const posting =  useSelector(selectPostbyId(postId))
    // console.log(posting)

    const post = useSelector((state)=> selectPostbyId(state, postId))
    console.log(post)
    
  return (
    <div>
        {post ?
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <Author post={post}/>
            <p><TimeAgo timestamp={post.date} />   </p>
            <Reactions post={post} />
        </article>
            : 
        <article>
            <h2>No Post Found</h2>
        </article>
        }
    </div>
  )
}

export default SinglePostPage