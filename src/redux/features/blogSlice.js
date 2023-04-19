import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { restURL } from "../../utils/configProvider";

const initialState = {data: [], error: null, loading: false, isFetched: false}

export const fetchBlog = createAsyncThunk('blogs/fetchBlog', () => {
    return axios.get(restURL + `/api/blog`).then(result => result.data.data)
})

export const likeUnlikeBlog = createAsyncThunk('blogs/likeUnlikeBlog', (blog) => {
    return axios.post(restURL + `/api/blog/${blog.id}/like`, {
        doLike: blog.doLike
    }).then(result => result.data)
})

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        addComment: (state, action) => {
            state.data = state.data.map(item => {
                if(item.id === action.payload){
                    return {...item, comments: +item.comments + 1}
                }else{
                    return item;
                }
            })
        },
        clearLikeStatus: (state) => {
            state.data = state.data.map(item => {
                return {...item, isLiked: "0"}
            })
        },
        updateLikeStatus: (state, action) => {
            state.data = state.data.map(item => {
                if(item.id === action.payload.id){
                    if(action.payload.doLike)  return {...item, likes: +item.likes + 1, isLiked: "1"}
                    return {...item, likes: +item.likes - 1, isLiked: "0"}
                }else{
                    return item;
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBlog.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchBlog.rejected, (state, action) => {
            state.loading = false;
            state.isFetched = true;
            state.error = action.error.message
        })
        builder.addCase(fetchBlog.fulfilled, (state, action) => {
            state.loading = false;
            state.isFetched = true;
            state.data = action.payload
        })
        builder.addCase(likeUnlikeBlog.fulfilled, (state, action) => {
            state.data = state.data.map(item => {
                if(item.id === action.meta.arg.id){
                    if(action.meta.arg.doLike)  return {...item, likes: +item.likes + 1, isLiked: "1"}
                    return {...item, likes: +item.likes - 1, isLiked: "0"}
                }else{
                    return item;
                }
            })
        })
    }
})

export const { addComment, clearLikeStatus, updateLikeStatus } = blogSlice.actions
export default blogSlice.reducer