import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './features/blogSlice'
import userReducer from './features/userSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer
  },
})

export default store