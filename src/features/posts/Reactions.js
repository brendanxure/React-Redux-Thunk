import { useSelector, useDispatch  } from "react-redux";
import { reactionAdded, selectAllPost } from "./PostSlice";

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤',
    rocket: '🔥',
    coffee: '☕'
}

const Reactions = ({post}) => {
    // const posts = useSelector(selectAllPost)
    // const eachpost = posts.map(post=> post.reactions)
    // console.log(eachpost)

    const dispatch = useDispatch()


    const reactionbuttons = Object.entries(reactionEmoji).map(([name, emoji])=> 
        <button onClick={ (e) => {
            e.preventDefault();
            dispatch(reactionAdded({postId: post.id, reaction: name}))
        } } >
            {emoji} {post.reactions[name]}
        </button>
    )
  return (
    <div>{reactionbuttons}</div>
  )
}

export default Reactions