import React from 'react'
import { selectAllUser } from "./Userslice";
import { useSelector } from 'react-redux';

const Author = ({post}) => {
    const users = useSelector(selectAllUser)

    const eachuser = users.find(user=> user.id === post.userId) 
  
  return (
    <div>
        <p>by {post.user ? post.user : eachuser ? eachuser.name :'unknown author'}</p>
    </div>
  )
}

export default Author