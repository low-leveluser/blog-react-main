import { configureStore } from '@reduxjs/toolkit'

import postsListReducer from './features/posts/postsSlice'
import userReducer from './features/user/userSlice'
import articleReducer from './features/article/articleSlice'

export default configureStore({
  reducer: {
    postsList: postsListReducer,
    article: articleReducer,
    user: userReducer,
  },
})
