import { useSelector, useDispatch } from "react-redux";
import { selectAllPost, getPostsStatus, getPostsError, fetchPosts } from "./PostSlice";
import TimeAgo from "./TimeAgo";
import { useEffect } from "react";

import React from 'react'
import Reactions from "./Reactions";
import Author from "./Author";
import { Link } from "react-router-dom";


const PostLists = () => {
    const posts = useSelector(selectAllPost)
    const status =  useSelector(getPostsStatus)
    const error = useSelector(getPostsError)
   

    const dispatch = useDispatch()

    const orderedPost = posts.slice().sort((a, b)=> b.date.localeCompare(a.date))

    console.log(orderedPost)

    useEffect(()=> {
        if(status === 'idle') {
            dispatch(fetchPosts())
        }
    }, [dispatch])
    
    const renderedPosts = orderedPost.map(post=>
        <article key={post.id}>
            <Link to={`post/${post.id}`}><h3>{post.title}</h3></Link> 
            <p>{post.body.substring(0, 100)}</p>
            <Author post={post}/>
            <p><TimeAgo timestamp={post.date} /></p>
            <Reactions post={post} />
        </article>)
    const loading = <article>Loading...</article>
  return (
    <div>
        <section>
            <h2>Posts</h2>
            <div>
            {status=== 'succeeded' ? renderedPosts : status === 'loading' ? loading : status === 'failed' ? error : null}
            </div>
        </section>
    </div>
  )
}

export default PostLists