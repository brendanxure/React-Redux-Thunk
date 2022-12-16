import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

// const initialState = [
//     { id: '1', title: 'Learning Redux toolkit', content: 'To learn react redux toolkit takes a while', date: sub(new Date(), { minutes: 10}).toISOString(), reactions: {
//         thumbsUp: 0,
//         wow: 0,
//         heart: 0,
//         rocket: 0,
//         coffee: 0
//     }},
//     { id: '2', title: 'My first project', content: 'This project is really really tasking', date: sub(new Date(), { minutes: 5}).toISOString(), reactions: {
//         thumbsUp: 0,
//         wow: 0,
//         heart: 0,
//         rocket: 0,
//         coffee: 0
//     }}
// ]

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await axios.get(POSTS_URL)
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err.message)
        return err.message;
    }
})

const PostSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded:{
        reducer(state, action) {
            state.posts.push(action.payload)
        },
        prepare(title, content, user) {
            return{
              payload: { 
                id: nanoid(),
                title,
                body: content,
                date: new Date().toISOString(),
                user,
                reactions: {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
              }
            }
        }
    },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status= 'succeeded'
            // adding date and reation
            let min = 1;
            const loadedPosts = action.payload.map(post => {
                post.date = sub(new Date(), { minutes: min++ }).toISOString()
                post.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0 
                }
                return post;
            })

            // no date and reaction 
            // state.posts = state.posts.concat(action.payload)
            // console.log(action.payload)

            // Add any fetched posts to the array
            state.posts = loadedPosts
            console.log(loadedPosts)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})


export const selectAllPost = state => state.posts.posts
export const getPostsStatus = state => state.posts.status
export const getPostsError = state => state.posts.error
export const selectPostbyId = (state, postId) => state.posts.posts.find(post=> post.id == postId)


export const { postAdded, reactionAdded } = PostSlice.actions

export default PostSlice.reducer