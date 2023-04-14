import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import getPostList from '../../services/getPostsList'
import serviceArticle from '../../services/serviceArticle'

export const fetchPostsList = createAsyncThunk('postsList/fetchPostsList', async (token, { getState }) => {
  const { currentPage } = getState().postsList
  return getPostList(token, currentPage)
})

export const fetchFavorite = createAsyncThunk('postsList/fetchFavorite', async (dataForm) => serviceArticle(dataForm))

const postsListSlice = createSlice({
  name: 'postsList',
  initialState: {
    posts: [],
    postsCount: 0,
    currentPage: 1,
    status: 'idle',
    error: null,
    favorite: {
      status: 'idle',
    },
  },
  reducers: {
    pageChange(state, action) {
      state.status = 'idle'
      state.currentPage = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPostsList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPostsList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = action.payload.articles
        state.postsCount = action.payload.articlesCount
      })
      .addCase(fetchPostsList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchFavorite.pending, (state) => {
        state.error = null
        state.favorite.status = 'loading'
      })
      .addCase(fetchFavorite.fulfilled, (state, action) => {
        const { slug, favorited, favoritesCount } = action.payload.article
        state.favorite = {
          status: 'succeeded',
          slug,
          favorited,
          favoritesCount,
        }
      })
      .addCase(fetchFavorite.rejected, (state, action) => {
        state.error = action.error.message
      })
  },
})

export const { pageChange } = postsListSlice.actions

export default postsListSlice.reducer
