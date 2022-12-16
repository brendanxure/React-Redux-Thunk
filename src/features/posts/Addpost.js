import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { postAdded } from './PostSlice'
import { selectAllUser, fetchUsers } from './Userslice'


const Addpost = () => {
  const dispatch = useDispatch()

  const [title, setTitle ]= useState('')
  const [content, setContent] = useState('')
  const [user, setUser] = useState('')

  console.log(title, content, user)

  useEffect(()=> {
    dispatch(fetchUsers())
  },[])

  const onclick = (e) => {
    e.preventDefault();
    if(title && content && user) {
    dispatch(postAdded(title, content, user))

    setContent('')
    setTitle('')
    setUser('')
    }
    else {
      alert('please fill in the form completely')
    }
  }

  const save = [title && content && user ].every(Boolean)

  const users = useSelector(selectAllUser)

  console.log(users)
   const eachuser = users.map(user=>
    <option>
      {user.name}
    </option>
    )

  return (
    <div className='Addpost'>
      <label htmlFor='title'>Title: </label>
        <input id='title' type='text' autoFocus value={title} onChange={(e) => setTitle(e.target.value)} />
        <select style={{height: '2rem'}} value={user} onChange={(e)=> setUser(e.target.value)} >
          <option value=""></option>
          {eachuser}
        </select>
      <label htmlFor='content'>Content: </label>
        <textarea id='content' rows='5' value={content} onChange={(e)=> setContent(e.target.value)} />
        <input type='submit' onClick={onclick} disabled={!save} />
    </div>
  )
}

export default Addpost